using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public sealed class MatchSettings : ValueObject<MatchSettings>
{
    public MatchSettings(
        LCID language,
        int alphabetId,
        IReadOnlySet<char> availableChars,
        ushort roundsCount,
        ushort secondsPerWord,
        bool isPublic)
    {
        this.Language = language;
        this.AlphabetId = alphabetId;
        this.AvailableChars = availableChars ?? throw new ArgumentNullException(nameof(availableChars));
        this.RoundsCount = roundsCount;
        this.SecondsPerWord = secondsPerWord;
        this.IsPublic = isPublic;
    }

    public LCID Language { get; init; }
    //public AlphabetFamily AlphabetFamily { get; init; }
    public int AlphabetId { get; init; }
    public IReadOnlySet<char> AvailableChars { get; init; }
    public ushort RoundsCount { get; init; }
    public ushort SecondsPerWord { get; init; }
    public bool IsPublic { get; init; }

    protected override IEnumerable<object> GetValueIngredients()
    {
        yield return this.Language;
        yield return this.AlphabetId;
        yield return this.AvailableChars;
        yield return this.RoundsCount;
        yield return this.SecondsPerWord;
        yield return this.IsPublic;
    }
}
