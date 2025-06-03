using notes.api.Entities;
using notes.api.Requests;

namespace notes.api.Services;

public interface INoteService
{
    Task<List<Note>> GetAll();
    Task<Note?> GetById(Guid id);
    Task<Guid> Create(CreateNoteRequest request);
    Task Update(Guid id, UpdateNoteRequest request);
    Task Delete(Guid id);
}