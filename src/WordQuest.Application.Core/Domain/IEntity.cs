namespace WordQuest.Domain;

public interface IEntity<TIdentity>
    : IEquatable<IEntity<TIdentity>>
    where TIdentity : IEquatable<TIdentity>
{
    TIdentity Id { get; }
}
