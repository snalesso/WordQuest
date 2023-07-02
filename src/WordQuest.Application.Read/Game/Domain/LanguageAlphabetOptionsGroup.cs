namespace WordQuest.Game.Domain;

public class LanguageAlphabetOptionsGroup
{
    public LanguageAlphabetOptionsGroup(ILanguageOption language, IReadOnlyList<IAlphabetOption> alphabetOptions)
    {
        this.Language = language;
        this.AlphabetVariants = alphabetOptions ?? throw new ArgumentNullException(nameof(alphabetOptions));
    }

    public ILanguageOption Language { get; }
    public IReadOnlyList<IAlphabetOption> AlphabetVariants { get; }
}
