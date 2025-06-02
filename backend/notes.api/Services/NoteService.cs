using Microsoft.EntityFrameworkCore;
using notes.api.Data;
using notes.api.Entities;

namespace notes.api.Services;

public class NoteService: INoteService
{
    private readonly NotesDbContext _context;

    public NoteService(NotesDbContext context)
    {
        _context = context;
    }

    public async Task<List<Note>> GetAll() => await _context.Notes.ToListAsync();
    
    public async Task<Note?> GetById(Guid id) => await _context.Notes.FindAsync(id);

    public async Task<Guid> Create(Note note)
    {
        await _context.Notes.AddAsync(note);
        await _context.SaveChangesAsync();
        return note.Id;
    }

    public async Task Update(Guid id, Note note)
    {
        var existingNote = await _context.Notes.FindAsync(id);
        if (existingNote is not null)
        {
            _context.Notes.Update(note);
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