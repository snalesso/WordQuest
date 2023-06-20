//using WordQuest.Domain.Persistence;

//namespace WordQuest.Game.Domain.Persistence;

//public class ReadOnlyGameUnitOfWorkFactory : IReadOnlyUnitOfWorkFactory<IReadOnlyGameDbConnectionContext>
//{
//    public Task<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>> CreateAsync(CancellationToken cancellationToken = default)
//    {
//        return Task.FromResult<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>>(new EfCoreReadOnlyGameUnitOfWork(new ()));
//    }
//}
