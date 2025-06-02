namespace notes.api.Entities;

public class Note
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
}