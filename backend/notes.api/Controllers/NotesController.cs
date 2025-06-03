using Microsoft.AspNetCore.Mvc;
using notes.api.Entities;
using notes.api.Requests;
using notes.api.Services;

namespace notes.api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : Controller
{
    private readonly INoteService _noteService;

    public NotesController(INoteService noteService)
    {
        _noteService = noteService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Note>>> GetAllNotes()
    {
        var notes = await _noteService.GetAll();
        return Ok(notes);
    }
    
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Note>> GetNoteById(Guid id)
    {
        var note = await _noteService.GetById(id);
        return note is null ? NotFound() : Ok(note);
    }
    
    [HttpPost]
    public async Task<ActionResult<Guid>> CreateNote(CreateNoteRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title)) 
            return BadRequest("Title is required");
        
        
        var id = await _noteService.Create(request);
        return CreatedAtAction(nameof(GetNoteById), new {id}, id);   
    }
    
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateNote(Guid id, UpdateNoteRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title)) 
            return BadRequest("Title is required");
        
        if(await _noteService.GetById(id) is null)
            return NotFound();
        
        await _noteService.Update(id, request);
        return NoContent();  
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteNote(Guid id)
    {
        if(await _noteService.GetById(id) is null)
            return NotFound();
        
        await _noteService.Delete(id);
        return NoContent();    
    }
}