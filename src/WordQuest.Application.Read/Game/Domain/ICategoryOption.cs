using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public interface ICategoryOption : IEntity<Guid>
{
    string? Description { get; init; }
    string Name { get; init; }
}