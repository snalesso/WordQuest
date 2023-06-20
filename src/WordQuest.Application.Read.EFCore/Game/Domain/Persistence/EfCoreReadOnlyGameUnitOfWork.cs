using System.Data;
using System.Data.Common;
using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public class EfCoreReadOnlyGameUnitOfWork
    : ReadOnlyUnitOfWork<EfCoreReadOnlyGameDbConnectionContext>
    , IDisposable
    , IAsyncDisposable
{
    public EfCoreReadOnlyGameUnitOfWork(DbConnection dbConnection) : base(dbConnection) { }

    protected override EfCoreReadOnlyGameDbConnectionContext CreateContext(DbConnection connection)
    {
        return new EfCoreReadOnlyGameDbConnectionContext(new EfCoreReadOnlyGameDbContext(connection));
    }

    //#region IDisposable & IAsyncDisposable

    //private bool _isDisposed = false;

    //// use this in derived class
    //// protected override void Dispose(bool isDisposing)
    //// use this in non-derived class
    //protected virtual void Dispose(bool isDisposing)
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
    //    //base.Dispose(isDisposing);
    //}

    //// remove if in derived class
    //public void Dispose()
    //{
    //    // Do not change this code. Put cleanup code in Dispose(bool isDisposing) above.
    //    this.Dispose(true);
    //}

    //public ValueTask DisposeAsync()
    //{
    //    try
    //    {
    //        this.Dispose();

    //        return default;
    //    }
    //    catch (Exception exc)
    //    {
    //        return new ValueTask(Task.FromException(exc));
    //    }
    //}

    //#endregion
}
