namespace WordQuest.Domain.Persistence;

//public interface IReadOnlyUnitOfWorkFactory<TDbContext>
//{
//    Task<IReadOnlyUnitOfWork<TDbContext>> CreateAsync(CancellationToken cancellationToken = default);
//}

public interface IReadOnlyUnitOfWorkFactory<TUnitOfWork, TDbConnectionContext>
    where TUnitOfWork : IReadOnlyUnitOfWork<TDbConnectionContext>
{
    Task<TUnitOfWork> CreateAsync(CancellationToken cancellationToken = default);
}
