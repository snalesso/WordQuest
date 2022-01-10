namespace WordQuest.Culture.DTOs
{
    public class LanguageInfo : Language
    {
        public LanguageInfo(int id, string nativeName, IEnumerable<CharInfo> charConfigs) : base(id, nativeName)
        {
            this.CharConfigs = charConfigs ?? throw new ArgumentNullException(nameof(charConfigs));
        }

        public IEnumerable<CharInfo> CharConfigs { get; }
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
