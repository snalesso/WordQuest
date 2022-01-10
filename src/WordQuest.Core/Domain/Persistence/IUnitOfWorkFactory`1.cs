using System.Threading;
using System.Threading.Tasks;

namespace WordQuest.Domain.Persistence
{
    public interface IUnitOfWorkFactory<TUnitOfWork>
        where TUnitOfWork : IUnitOfWork
    {
        Task<TUnitOfWork> CreateAsync(CancellationToken cancellationToken = default);
    }
}
