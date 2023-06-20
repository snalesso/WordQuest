namespace WordQuest.Domain;

[Obsolete("Replace with INumber when it becomes stable.")]
public abstract class UInt16Entity : Entity<ushort>
{
    protected UInt16Entity(ushort id) : base(id) { }

    protected override bool IsIdentityValid(ushort id)
    {
        return id != 0;
    }
}
