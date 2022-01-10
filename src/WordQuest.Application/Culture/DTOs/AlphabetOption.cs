using System;
using System.Collections.Generic;

namespace WordQuest.Culture.DTOs
{
    public class AlphabetOption
    {
        public AlphabetOption(int id, string nativeName, IEnumerable<CharInfo> charInfos)
        {
            // TODO: checks
            this.Id = id;
            this.NativeName = nativeName ?? throw new ArgumentNullException(nameof(nativeName));
            this.CharInfos = charInfos ?? throw new ArgumentNullException(nameof(charInfos));
        }

        public int Id { get; private init; }
        public string NativeName { get; private init; }
        public IEnumerable<CharInfo> CharInfos { get; private init; }
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

}
