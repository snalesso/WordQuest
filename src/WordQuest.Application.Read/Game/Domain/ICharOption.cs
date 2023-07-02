using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public interface ICharOption : IEntity<char>
{
    CharMetadata Metadata { get; init; }
}