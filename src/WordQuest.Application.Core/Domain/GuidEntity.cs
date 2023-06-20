namespace WordQuest.Domain;

public abstract class GuidEntity : Entity<Guid>
{
    protected GuidEntity(Guid id) : base(id) { }

    protected override bool IsIdentityValid(Guid id)
    {
        return id != Guid.Empty;
    }
}
