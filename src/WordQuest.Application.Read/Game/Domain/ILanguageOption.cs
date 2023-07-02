using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public interface ILanguageOption : IEntity<short>
{
    string NativeName { get; init; }
}