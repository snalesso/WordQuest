using System.Diagnostics.CodeAnalysis;

namespace WordQuest.Domain;

public abstract class GuidEntity : Entity<Guid>
{
    public GuidEntity() : base() { }

    [SetsRequiredMembers]
    protected GuidEntity(Guid id) : base(id) { }

    protected override bool IsIdentityValid(Guid id)
    {
        return id != Guid.Empty;
    }
}
