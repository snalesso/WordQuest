namespace WordQuest.Domain.Persistence;

public interface IReadOnlyUnitOfWorkFactory<TDbContext>
{
    Task<IReadOnlyUnitOfWork<TDbContext>> CreateAsync(CancellationToken cancellationToken = default);
}
