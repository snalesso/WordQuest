namespace WordQuest.Domain.Persistence;

/// <summary>
/// Represents a transaction that has no commit/rollback support, since it only allows reading.
/// </summary>
public interface IReadOnlyUnitOfWork<out TDbConnectionContext>
    // TODO: justify IDisposable implementation from here (interface level): we have no reason at this stage to force IDisposable API, a good reason might be that base UniOfWork class handles an IDbConnection
    //: IDisposable
    //, IAsyncDisposable
// TODO: replace with TDbTransactionContext which is the only API that exposes Rollback/Commit
{
    TDbConnectionContext Context { get; }

    //Task<TResult> TransactionalAsync<TResult>(
    //   Func<TDbConnectionContext, CancellationToken, Task<TResult>> createOperation,
    //   CancellationToken cancellationToken = default);

    //Task<TResult> TransactionalAsync<TResult>(
    //   Func<TDbConnectionContext, Task<TResult>> createOperation,
    //   CancellationToken cancellationToken = default);

    //Task TransactionalAsync(
    //   Func<TDbConnectionContext, CancellationToken, Task> createOperation,
    //   CancellationToken cancellationToken = default);

    //Task TransactionalAsync(
    //   Func<TDbConnectionContext, Task> createOperation,
    //   CancellationToken cancellationToken = default);
}
