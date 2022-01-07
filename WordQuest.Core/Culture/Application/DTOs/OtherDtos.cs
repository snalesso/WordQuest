namespace WordQuest.Culture.Application.DTOs
{
    //public record CharInfoDto
    //{
    //    // TODO: check if conversion to JSON results into number or string
    //    public char Char { get; init; }
    //    public bool IsRare { get; init; }
    //}

    //public record LanguageDto
    //{
    //    public int Id { get; init; }
    //    public string NativeName { get; init; }
    //}

    //public record LanguageOptionDto : LanguageDto
    //{
    //    public IReadOnlyCollection<CharInfoDto> CharConfigs { get; init; }
    //}

    //public record AlphabetDto
    //{
    //    public int Id { get; init; }
    //    public string NativeName { get; init; }
    //    public LanguageDto Language { get; init; }
    //    public IReadOnlyDictionary<char, CharInfoDto> CharInfos { get; init; }
    //}

    public record CharInfoDto
    {
        // TODO: check if conversion JSON -> CLR results into number or string
        public char Char { get; init; }
        public bool IsUncommon { get; init; }
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
