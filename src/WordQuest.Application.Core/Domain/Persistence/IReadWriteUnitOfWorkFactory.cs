namespace WordQuest.Domain.Persistence;

public interface IReadWriteUnitOfWorkFactory<TDbContext>
{
    Task<IReadWriteUnitOfWork<TDbContext>> CreateAsync(CancellationToken cancellationToken = default);
}
