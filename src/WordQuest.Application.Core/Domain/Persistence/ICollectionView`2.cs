namespace WordQuest.Domain.Persistence;

public interface ICollectionView<TEntity, TIdentity>
    : ICollectionView<TEntity>
    , IView<TEntity, TIdentity>
    , IView<TEntity>
    where TIdentity : IEquatable<TIdentity>
    where TEntity : IEntity<TIdentity>
{
    // TODO: consider changing return type to IReadOnlyCollection
    Task<TEntity> GetAsync(TIdentity identity, CancellationToken cancellationToken = default);
}
