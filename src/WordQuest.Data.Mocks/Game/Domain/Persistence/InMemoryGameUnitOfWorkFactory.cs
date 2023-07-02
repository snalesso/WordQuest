using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public class InMemoryGameUnitOfWorkFactory : IReadOnlyUnitOfWorkFactory<TransactionContext>
{
    //private readonly Func<IGameUnitOfWork> _createUow;

    //public InMemoryGameUnitOfWorkFactory(Func<IGameUnitOfWork> func)
    //{
    //}

    public Task<IReadOnlyGameDbContext> CreateAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyGameDbContext>(new InMemoryGameUnitOfWork());
    }
}
