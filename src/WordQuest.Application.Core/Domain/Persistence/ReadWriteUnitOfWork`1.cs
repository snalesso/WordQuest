using System.Data.Common;

namespace WordQuest.Domain.Persistence;

public abstract class ReadWriteUnitOfWork<TDbConnectionContext>
    : UnitOfWork<TDbConnectionContext>
    , IReadOnlyUnitOfWork<TDbConnectionContext>
    , IReadWriteUnitOfWork<TDbConnectionContext>
{
    protected ReadWriteUnitOfWork(DbConnection dbConnection) : base(dbConnection) { }

    public Task CommitAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task RollbackAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    //public async Task<TResult> TransactionalAsync<TResult>(
    //    Func<TDbConnectionContext, CancellationToken, Task<TResult>> createOperation,
    //    CancellationToken cancellationToken = default)
    //{
    //    try
    //    {
    //        var result = await createOperation(this.Context, cancellationToken).ConfigureAwait(false);
    //        return result;
    //    }
    //    catch (Exception ex)
    //    {
    //        throw;
    //    }
    //}

    //public Task<TResult> TransactionalAsync<TResult>(
    //    Func<TDbConnectionContext, Task<TResult>> createOperation,
    //    CancellationToken cancellationToken = default)
    //{
    //    return this.TransactionalAsync(
    //        (uow, _) => createOperation(this.Context),
    //        cancellationToken);
    //}

    //public async Task TransactionalAsync(
    //    Func<TDbConnectionContext, CancellationToken, Task> createOperation,
    //    CancellationToken cancellationToken = default)
    //{
    //    try
    //    {
    //        await createOperation(this.Context, cancellationToken).ConfigureAwait(false);
    //    }
    //    catch (Exception ex)
    //    {
    //        throw;
    //    }
    //}

    //public Task TransactionalAsync(
    //    Func<TDbConnectionContext, Task> createOperation,
    //    CancellationToken cancellationToken = default)
    //{
    //    return this.TransactionalAsync(
    //        (ctx, _) => createOperation(ctx),
    //        cancellationToken);
    //}

    #region IDisposable & IAsyncDisposable
    #endregion
}
