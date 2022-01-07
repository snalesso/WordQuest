using System;
using System.Threading.Tasks;

namespace WordQuest.Common.Persistence
{
    public interface IUnitOfWork : IDisposable, IAsyncDisposable
    {
        Task CommitAsync();
        Task RollbackAsync();
    }

    public interface IUnitOfWorkFactory<T>
        where T : IUnitOfWork
    {

    }
}
