using Microsoft.EntityFrameworkCore;
using notes.api.Entities;

namespace notes.api.Data;

public class NotesDbContext: DbContext
{
    public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options) { }

    public DbSet<Note> Notes { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}