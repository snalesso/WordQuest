namespace WordQuest.Game.Domain;

public interface ICharInfo
{
    char Char { get; init; }
    CharMetadata Metadata { get; init; }
}
