namespace WordQuest.Game.Domain.Persistence;

public interface IReadOnlyGameDbConnectionContext
{
    ILanguageOptionsView LanguageOptions { get; }
    IAlphabetVariantOptionsView AlphabetVariantOptions { get; }
    IAlphabetVariantCharOptionsView AlphabetVariantCharOptions { get; }
    ICategoryOptionsView CategoryOptions { get; }
}
