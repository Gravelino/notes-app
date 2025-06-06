using Microsoft.EntityFrameworkCore;
using notes.api.Data;
using notes.api.Extensions;
using notes.api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<NotesDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<INoteService, NoteService>();

#region Add CORS

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
#endregion

builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

await app.ApplyMigrationsAsync<NotesDbContext>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();