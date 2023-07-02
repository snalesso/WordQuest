using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public sealed class EfCoreReadWriteGameUnitOfWorkFactory
    : /*ReadWriteUnitOfWorkFactory<EfCoreGameDbConnectionContext>
    ,*/ IReadWriteUnitOfWorkFactory<EfCoreGameDbConnectionContext>
{


    public Task<IReadWriteUnitOfWork<EfCoreGameDbConnectionContext>> CreateAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
