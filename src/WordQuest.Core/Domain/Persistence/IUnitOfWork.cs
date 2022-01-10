using System;
using System.Threading.Tasks;

namespace WordQuest.Domain.Persistence
{
    public interface IUnitOfWork : /*IDisposable,*/ IAsyncDisposable
    {
        Task CommitAsync();
        // TODO: return ValueTask (since it will use DisposeAsync)?
        Task RollbackAsync();
    }
}
