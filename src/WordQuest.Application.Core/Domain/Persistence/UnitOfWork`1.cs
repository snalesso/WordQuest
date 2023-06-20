using System.Data;
using System.Data.Common;

namespace WordQuest.Domain.Persistence;

public abstract class UnitOfWork<TDbConnectionContext>
{
    protected readonly DbConnection _dbConnection;

    public UnitOfWork(DbConnection dbConnection)
    {
        this._dbConnection = dbConnection ?? throw new ArgumentNullException(nameof(dbConnection));
        this.Context = this.CreateContext(this._dbConnection) ?? throw new ArgumentNullException();
    }

    public TDbConnectionContext Context { get; }

    protected abstract TDbConnectionContext CreateContext(DbConnection connection);

    #region IDisposable & IAsyncDisposable

    private bool _isDisposed = false;

    // remove if in derived class
    public void Dispose()
    {
        // Do not change this code. Put cleanup code in Dispose(bool isDisposing) above.
        this.Dispose(true);
    }

    // use this in derived class
    // protected override void Dispose(bool isDisposing)
    // use this in non-derived class
    protected virtual void Dispose(bool isDisposing)
    {
        if (this._isDisposed)
            return;

        if (isDisposing)
        {
            // free managed resources here
        }

        // free unmanaged resources (unmanaged objects) and override a finalizer below.
        // set large fields to null.

        this._isDisposed = true;

        // remove in non-derived class
        //base.Dispose(isDisposing);
    }

    public ValueTask DisposeAsync()
    {
        try
        {
            this.Dispose();

            return default;
        }
        catch (Exception exc)
        {
            return new ValueTask(Task.FromException(exc));
        }
    }

    #endregion
}