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
        
        modelBuilder.Entity<Note>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();
        });
    }
}