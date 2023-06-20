namespace WordQuest.Domain;

[Obsolete("Replace with INumber when it becomes stable.")]
public abstract class Int16Entity : Entity<short>
{
    protected Int16Entity(short id) : base(id) { }

    protected override bool IsIdentityValid(short id)
    {
        return id != 0;
    }
}
