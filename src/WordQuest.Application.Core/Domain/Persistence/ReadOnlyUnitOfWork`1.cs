using System.Data;
using System.Data.Common;

namespace WordQuest.Domain.Persistence;

public abstract class ReadOnlyUnitOfWork<TDbConnectionContext>
    : UnitOfWork<TDbConnectionContext>
    , IReadOnlyUnitOfWork<TDbConnectionContext>
{
    protected ReadOnlyUnitOfWork(DbConnection dbConnection) : base(dbConnection) { }

    public async Task<TResult> TransactionalAsync<TResult>(
        Func<TDbConnectionContext, CancellationToken, Task<TResult>> createOperation,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var result = await createOperation(this.Context, cancellationToken).ConfigureAwait(false);
            return result;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public Task<TResult> TransactionalAsync<TResult>(
        Func<TDbConnectionContext, Task<TResult>> createOperation,
        CancellationToken cancellationToken = default)
    {
        return this.TransactionalAsync(
            (uow, _) => createOperation(this.Context),
            cancellationToken);
    }

    public async Task TransactionalAsync(
        Func<TDbConnectionContext, CancellationToken, Task> createOperation,
        CancellationToken cancellationToken = default)
    {
        try
        {
            await createOperation(this.Context, cancellationToken).ConfigureAwait(false);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public Task TransactionalAsync(
        Func<TDbConnectionContext, Task> createOperation,
        CancellationToken cancellationToken = default)
    {
        return this.TransactionalAsync(
            (ctx, _) => createOperation(ctx),
            cancellationToken);
    }

    #region IDisposable & IAsyncDisposable

    //private bool _isDisposed = false;

    // use this in derived class
    //protected override void Dispose(bool isDisposing)
    //// use this in non-derived class
    //// protected virtual void Dispose(bool isDisposing)
    //{
    //    if (this._isDisposed)
    //        return;

    //    if (isDisposing)
    //    {
    //        // free managed resources here
    //    }

    //    // free unmanaged resources (unmanaged objects) and override a finalizer below.
    //    // set large fields to null.

    //    this._isDisposed = true;

    //    // remove in non-derived class
    //    base.Dispose(isDisposing);
    //}

    // remove if in derived class
    //public void Dispose()
    //{
    //    // Do not change this code. Put cleanup code in Dispose(bool isDisposing) above.
    //    this.Dispose(true);
    //}

    #endregion
}
