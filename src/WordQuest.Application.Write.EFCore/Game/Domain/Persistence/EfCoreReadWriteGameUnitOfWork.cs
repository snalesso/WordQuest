//using System.Data;
//using System.Data.Common;
//using WordQuest.Domain.Persistence;

//namespace WordQuest.Game.Domain.Persistence;

//public sealed class EfCoreReadWriteGameUnitOfWork
//    : ReadWriteUnitOfWork<EfCoreGameDbConnectionContext>
//    , IReadWriteUnitOfWork<EfCoreGameDbConnectionContext>
//    , IDisposable
//    , IAsyncDisposable
//{
//    public EfCoreReadWriteGameUnitOfWork(DbConnection dbConnection) : base(dbConnection) { }

//    protected override EfCoreGameDbConnectionContext CreateContext(DbConnection connection)
//    {
//        return new EfCoreGameDbConnectionContext(new EfCoreReadWriteGameDbContext(connection));
//    }

//    public Task<TResult> TransactionalAsync<TResult>(Func<IGameDbConnectionContext, CancellationToken, Task<TResult>> createOperation, CancellationToken cancellationToken = default)
//    {
//        throw new NotImplementedException();
//    }

//    public Task<TResult> TransactionalAsync<TResult>(Func<IGameDbConnectionContext, Task<TResult>> createOperation, CancellationToken cancellationToken = default)
//    {
//        throw new NotImplementedException();
//    }

//    public Task TransactionalAsync(Func<IGameDbConnectionContext, CancellationToken, Task> createOperation, CancellationToken cancellationToken = default)
//    {
//        throw new NotImplementedException();
//    }

//    public Task TransactionalAsync(Func<IGameDbConnectionContext, Task> createOperation, CancellationToken cancellationToken = default)
//    {
//        throw new NotImplementedException();
//    }

//    #region IDisposable & IAsyncDisposable

//    private bool _isDisposed = false;

//    // use this in derived class
//    protected override void Dispose(bool isDisposing)
//    // use this in non-derived class
//    //protected virtual void Dispose(bool isDisposing)
//    {
//        if (this._isDisposed)
//            return;

//        if (isDisposing)
//        {
//            // free managed resources here
//            this.Context.Dispose();
//        }

//        // free unmanaged resources (unmanaged objects) and override a finalizer below.
//        // set large fields to null.

//        this._isDisposed = true;

//        // activate in derived class
//        // remove in non-derived class
//        base.Dispose(isDisposing);
//    }

//    // remove if in derived class
//    //public void Dispose()
//    //{
//    //    // Do not change this code. Put cleanup code in Dispose(bool isDisposing) above.
//    //    this.Dispose(true);
//    //}

//    // remove if in derived class
//    //public override ValueTask DisposeAsync()
//    //{
//    //    try
//    //    {
//    //        this.Dispose();

//    //        return default;
//    //    }
//    //    catch (Exception exc)
//    //    {
//    //        return new ValueTask(Task.FromException(exc));
//    //    }
//    //}

//    #endregion
//}