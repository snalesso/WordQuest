namespace WordQuest.Domain.Persistence;

/// <summary>
/// Represents the context of a transaction
/// </summary>
public interface IReadWriteUnitOfWork<out TDbContext>
    : IReadOnlyUnitOfWork<TDbContext>
    , IDisposable
    , IAsyncDisposable
{
    Task CommitAsync(CancellationToken cancellationToken = default);
    //// TODO: consider returning ValueTask (since it will use DisposeAsync)
    Task RollbackAsync(CancellationToken cancellationToken = default);
}
