//using WordQuest.Domain.Persistence;

//namespace WordQuest.Game.Domain.Persistence;

//public class EfCoreGameUnitOfWorkFactory : IReadWriteUnitOfWorkFactory<IGameDbConnectionContext>
//{
//    public Task<IUnitOfWork<IGameDbConnectionContext>> CreateAsync(CancellationToken cancellationToken = default)
//    {
//        return Task.FromResult<IUnitOfWork<IGameDbConnectionContext>>(new EfCoreReadWriteGameUnitOfWork( ));
//    }
//}
