    namespace WordQuest.Domain.Persistence;

public interface IView<TEntity, TIdentity> : IView<TEntity>
    where TIdentity : IEquatable<TIdentity>
    where TEntity : Entity<TIdentity>
{
    // TODO: consider changing return type to IReadOnlyCollection
    Task<TEntity?> GetAsync(TIdentity identity, CancellationToken cancellationToken = default);
}
