namespace WordQuest.Domain.Persistence;

public sealed class EntityNotFoundException : Exception
{
    public EntityNotFoundException() : base()
    {
    }
}
