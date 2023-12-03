namespace WordQuest.Game.Domain;

public class AlphabetVariantCreationParams
{
    public AlphabetVariantCreationParams(int alphabetFamilyId, IReadOnlyDictionary<char, CharMetadata> charMetadataMap, Language language)
    {
        this.AlphabetFamilyId = alphabetFamilyId;
        this.CharMetadataMap = charMetadataMap ?? throw new ArgumentNullException(nameof(charMetadataMap));
        this.Language = language ?? throw new ArgumentNullException(nameof(language));
    }

    public int AlphabetFamilyId { get; init; }
    public IReadOnlyDictionary<char, CharMetadata> CharMetadataMap { get; init; }
    public Language Language { get; init; }
}