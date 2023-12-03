//using WordQuest.Domain;

//namespace WordQuest.Game.Domain.Entities;

//public class AlphabetVariant : GuidEntity
//{
//    public AlphabetVariant(
//        Guid id,
//        Language language,
//        IReadOnlyDictionary<char, CharMetadata> charMetadataMap,
//        int alphabetFamilyId)
//        : base(id)
//    {
//        ArgumentNullException.ThrowIfNull(language);
//        ArgumentNullException.ThrowIfNull(charMetadataMap);
//        EmptyEnumerableException.ThrowIfEmpty(charMetadataMap);

//        this.Language = language;
//        this.AlphabetFamilyId = alphabetFamilyId;
//        this.CharMetadataMap = charMetadataMap;
//    }

//    public AlphabetVariant(
//        Language language,
//        IReadOnlyDictionary<char, CharMetadata> charMetadataMap,
//        int alphabetFamilyId)
//        : this(
//              Guid.NewGuid(),
//              language,
//              charMetadataMap,
//              alphabetFamilyId)
//    {
//    }

//    public Language Language { get; init; }

//    // TODO: consider creating an ad-hoc type which ensures the key is never null
//    public IReadOnlyDictionary<char, CharMetadata> CharMetadataMap { get; init; }

//    public int AlphabetFamilyId { get; init; }
//}
