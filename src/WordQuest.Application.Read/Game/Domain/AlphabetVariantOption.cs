using WordQuest.Domain;
using WordQuest.Game.Domain;

public sealed class AlphabetVariantOption : GuidEntity
{
    public AlphabetVariantOption(
        Guid id,
        LanguageOption language,
        IReadOnlyDictionary<char, CharMetadata> charMetadataMap)
        : base(id)
    {
        this.Language = language ?? throw new ArgumentNullException(nameof(language));
        this.CharMetadataMap = charMetadataMap ?? throw new ArgumentNullException(nameof(charMetadataMap));
    }

    public LanguageOption Language { get; init; }
    public IReadOnlyDictionary<char, CharMetadata> CharMetadataMap { get; init; }
}