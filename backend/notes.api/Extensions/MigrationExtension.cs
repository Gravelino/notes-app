using Microsoft.EntityFrameworkCore;

namespace notes.api.Extensions;

public static class MigrationExtension
{
    public static async Task ApplyMigrationsAsync<TContext>(
        this IHost host,
        CancellationToken cancellationToken = default) where TContext : DbContext
    {
        using IServiceScope scope = host.Services.CreateScope();
        ILogger<TContext> logger = scope.ServiceProvider.GetRequiredService<ILogger<TContext>>();

        try
        {
            TContext context = scope.ServiceProvider.GetRequiredService<TContext>();
            await context.Database.MigrateAsync(cancellationToken);
            logger.LogInformation("Database migrations applied successfully");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while applying database migrations");
            throw;
        }
    }
}