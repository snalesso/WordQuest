namespace WordQuest.Domain;

public abstract class NaturalEntity<TIdentity> : IEntity<TIdentity>
    where TIdentity : notnull, IEquatable<TIdentity>
{
    protected NaturalEntity()
    {
    }

    public abstract TIdentity Id { get; }

    public override bool Equals(object? obj)
    {
        return this.Equals(obj as NaturalEntity<TIdentity>);
    }

    public override int GetHashCode()
    {
        return this.Id.GetHashCode();
    }

    public bool Equals(IEntity<TIdentity>? other)
    {
        if (other is null)
            return false;

        if (ReferenceEquals(this, other))
            return true;

        if (this.GetType() != other.GetType())
            return false;

        return this.Id.Equals(other.Id);
    }

    #region operators

    public static bool operator ==(NaturalEntity<TIdentity>? left, NaturalEntity<TIdentity>? right)
    {
        if (left is null ^ right is null)
            return false;

        return left is null || left.Equals(right);
    }

    public static bool operator !=(NaturalEntity<TIdentity>? left, NaturalEntity<TIdentity>? right)
    {
        return !(left == right);
    }

    #endregion
}
