namespace WordQuest.Game.Domain;

public class LanguageAlphabetOptionsGroup
{
    public LanguageAlphabetOptionsGroup(LanguageOption language, IReadOnlyList<AlphabetOption> alphabetOptions)
    {
        this.Language = language;
        this.AlphabetVariants = alphabetOptions ?? throw new ArgumentNullException(nameof(alphabetOptions));
    }

    public LanguageOption Language { get; }
    public IReadOnlyList<AlphabetOption> AlphabetVariants { get; }
}
