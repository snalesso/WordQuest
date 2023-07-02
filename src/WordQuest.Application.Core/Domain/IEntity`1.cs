namespace WordQuest.Domain;

public interface IEntity<TIdentity>
    : IEntity
    , IEquatable<IEntity<TIdentity>>
    where TIdentity : IEquatable<TIdentity>
{
    TIdentity Id { get; }
}