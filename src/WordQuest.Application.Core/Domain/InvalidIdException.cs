namespace WordQuest.Domain;

public class InvalidIdException<TIdentity> : Exception
    where TIdentity : notnull, IEquatable<TIdentity>
{
    public InvalidIdException(TIdentity id) : base()
    {
        this.Id = id;
    }

    public TIdentity Id { get; }
}