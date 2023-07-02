using System.Diagnostics.CodeAnalysis;
using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public sealed class LanguageInfo : Int16Entity, IEntity<short>
{
    [SetsRequiredMembers]
    public LanguageInfo(short identity, string nativeName, IEnumerable<ICharInfo> charConfigs) : base(identity)
    {
        this.NativeName = nativeName ?? throw new ArgumentNullException(nameof(nativeName));
        this.CharConfigs = charConfigs ?? throw new ArgumentNullException(nameof(charConfigs));
    }

    public string NativeName { get; }
    public IEnumerable<ICharInfo> CharConfigs { get; }
}

//public record LanguageAlphabetPair
//{
//    public int LanguageId { get; init; }
//    public AlphabetFamily AlphabetFamily { get; init; }
//}

//public record LanguageDto(string NativeName);
//public record FullLanguageDto(int Id, string NativeName) : LanguageDto(NativeName);
////public record LanguageInfoDto(Language Language, string NativeName);

//public record AlphabetVariantBodyDto
//{
//    public AlphabetFamily AlphabetFamily { get; init; }
//}

//public record AlphabetVariantDto : AlphabetVariantBodyDto
//{
//    public string LocalizedName { get; init; }
//}

//public record AlphabetCharsDto
//{
//    public IReadOnlyDictionary<char, bool> CharInfos { get; init; }
//}

//public record AlphabetDto : AlphabetCharsDto
//{
//    public int LanguageId { get; init; }
//    public AlphabetDto Alphabet { get; init; }
//}

//public record LanguageAlphabetsBodyDto
//{
//    public string LanguageNativeName { get; init; }
//    public IReadOnlyDictionary<AlphabetFamily, AlphabetCharsDto> AlphabetVariants { get; init; }
//}
//public record LanguageAlphabetsDto(
//    FullLanguageDto Language,
//    IReadOnlyCollection<AlphabetVariantDto> AlphabetVariants);


//public record LanguageAlphabetPair
//{
//    public int LanguageId { get; init; }
//    public AlphabetFamily AlphabetFamily { get; init; }
//}

//public record LanguageDto(string NativeName);
//public record FullLanguageDto(int Id, string NativeName) : LanguageDto(NativeName);
////public record LanguageInfoDto(Language Language, string NativeName);

//public record AlphabetVariantBodyDto
//{
//    public AlphabetFamily AlphabetFamily { get; init; }
//}

//public record AlphabetVariantDto : AlphabetVariantBodyDto
//{
//    public string LocalizedName { get; init; }
//}

//public record AlphabetCharsDto
//{
//    public IReadOnlyDictionary<char, bool> CharInfos { get; init; }
//}

//public record AlphabetDto : AlphabetCharsDto
//{
//    public int LanguageId { get; init; }
//    public AlphabetDto Alphabet { get; init; }
//}

//public record LanguageAlphabetsBodyDto
//{
//    public string LanguageNativeName { get; init; }
//    public IReadOnlyDictionary<AlphabetFamily, AlphabetCharsDto> AlphabetVariants { get; init; }
//}
//public record LanguageAlphabetsDto(
//    FullLanguageDto Language,
//    IReadOnlyCollection<AlphabetVariantDto> AlphabetVariants);

