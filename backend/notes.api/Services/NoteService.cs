using Microsoft.EntityFrameworkCore;
using notes.api.Data;
using notes.api.Entities;
using notes.api.Requests;

namespace notes.api.Services;

public class NoteService: INoteService
{
    private readonly NotesDbContext _context;

    public NoteService(NotesDbContext context)
    {
        _context = context;
    }

    public async Task<List<Note>> GetAll() => await _context.Notes.OrderByDescending(n => n.UpdatedAt).ToListAsync();
    
    public async Task<Note?> GetById(Guid id) => await _context.Notes.FindAsync(id);

    public async Task<Guid> Create(CreateNoteRequest request)
    {
        var note = new Note
        {
            Title = request.Title,
            Content = request.Content,
        };
        
        await _context.Notes.AddAsync(note);
        await _context.SaveChangesAsync();
        return note.Id;
    }

    public async Task Update(Guid id, UpdateNoteRequest request)
    {
        var existingNote = await _context.Notes.FindAsync(id);
        if (existingNote is not null)
        {
            existingNote.Title = request.Title;
            existingNote.Content = request.Content;
            existingNote.UpdatedAt = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
        }
    }

    public async Task Delete(Guid id)
    {
        var existingNote = await _context.Notes.FindAsync(id);
        if (existingNote is not null)
        {
            _context.Notes.Remove(existingNote);
            await _context.SaveChangesAsync();
        }
    }
}