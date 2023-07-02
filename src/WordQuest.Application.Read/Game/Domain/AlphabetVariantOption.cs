using System.Diagnostics.CodeAnalysis;
using WordQuest.Domain;
using WordQuest.Game.Domain;

public sealed class AlphabetVariantOption : GuidEntity, IEntity<Guid>, IAlphabetVariantOption
{
    [SetsRequiredMembers]
    public AlphabetVariantOption(
        Guid id,
        string languageNativeName,
        string alphabetName,
        IReadOnlyDictionary<char, CharMetadata> charMetadataMap)
        : base(id)
    {
        this.LanguageNativeName = languageNativeName;
        this.AlphabetFamilyInvariantCultureName = alphabetName;
        this.CharMetadataMap = charMetadataMap ?? throw new ArgumentNullException(nameof(charMetadataMap));
    }

    required public string LanguageNativeName { get; init; }
    required public string AlphabetFamilyInvariantCultureName { get; init; }
    required public IReadOnlyDictionary<char, CharMetadata> CharMetadataMap { get; init; }
}