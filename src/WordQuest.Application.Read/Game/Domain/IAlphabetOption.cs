using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public interface IAlphabetOption : IEntity<ushort>
{
    string NativeName { get; init; }
}