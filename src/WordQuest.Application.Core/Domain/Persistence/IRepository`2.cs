namespace WordQuest.Domain.Persistence;

// TODO: explore making IRrepository's method static
public interface IRepository<TEntity, TIdentity>
    where TEntity : Entity<TIdentity>
    where TIdentity : IEquatable<TIdentity>
{
    Task AddAsync(TEntity entity, CancellationToken cancellationToken = default);
    Task UpdateAsync(TEntity entity, CancellationToken cancellationToken = default);
    Task RemoveAsync(TIdentity identity, CancellationToken cancellationToken = default);
    //Task<TEntity> UpdateAsync(IReadOnlyDictionary<string, object> changes, CancellationToken cancellationToken = default);
    Task<TEntity?> GetAsync(TIdentity identity, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);
}
