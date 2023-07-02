namespace WordQuest.Game.Domain;

public interface IAlphabetVariantOption
{
    IReadOnlyDictionary<char, CharMetadata> CharMetadataMap { get; init; }
    string LanguageNativeName { get; init; }
    string AlphabetFamilyInvariantCultureName { get; init; }
}