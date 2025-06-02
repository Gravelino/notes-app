using notes.api.Entities;

namespace notes.api.Services;

public interface INoteService
{
    Task<List<Note>> GetAll();
    Task<Note?> GetById(Guid id);
    Task<Guid> Create(Note note);
    Task Update(Guid id, Note note);
    Task Delete(Guid id);
}