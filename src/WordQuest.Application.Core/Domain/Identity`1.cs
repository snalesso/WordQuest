namespace WordQuest.Domain;

public abstract class Identity<TIdentity> : ValueObject<Identity<TIdentity>>
    where TIdentity : notnull, IEquatable<TIdentity>
{
    protected Identity(TIdentity value)
    {
        this.Value = this.IsValid(value) ? value : throw new InvalidIdException<TIdentity>(value);
    }

    public TIdentity Value { get; }

    protected abstract bool IsValid(TIdentity value);
}