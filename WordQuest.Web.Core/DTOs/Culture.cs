using WordQuest.Culture.Domain;
using WordQuest.Domain;
using WordQuest.Game.Domain;
using System;
using System.Collections.Generic;

namespace WordQuest.Web.DTOs
{
    //public record CharInfoDto
    //{
    //    // TODO: check if conversion to JSON results into number or string
    //    public char Char { get; set; }
    //    public bool IsRare { get; set; }
    //}

    //public record LanguageDto
    //{
    //    public int Id { get; set; }
    //    public string NativeName { get; set; }
    //}

    //public record LanguageOptionDto : LanguageDto
    //{
    //    public IReadOnlyCollection<CharInfoDto> CharConfigs { get; set; }
    //}

    //public record AlphabetDto
    //{
    //    public int Id { get; set; }
    //    public string NativeName { get; set; }
    //    public LanguageDto Language { get; set; }
    //    public IReadOnlyDictionary<char, CharInfoDto> CharInfos { get; set; }
    //}

    public class CharInfoDto
    {
        // TODO: check if conversion to JSON results into number or string
        public char Char { get; set; }
        public bool IsRare { get; set; }
    }

    public class LanguageDto
    {
        public int Id { get; set; }
        public string NativeName { get; set; }
    }

    public class LanguageOptionDto : LanguageDto
    {
        public IReadOnlyCollection<CharInfoDto> CharConfigs { get; set; }
    }

    public class AlphabetDto
    {
        public int Id { get; set; }
        public string NativeName { get; set; }
        public LanguageDto Language { get; set; }
        public IReadOnlyDictionary<char, CharInfoDto> CharInfos { get; set; }
    }

    //public record LanguageAlphabetPair
    //{
    //    public int LanguageId { get; set; }
    //    public AlphabetFamily AlphabetFamily { get; set; }
    //}

    //public record LanguageDto(string NativeName);
    //public record FullLanguageDto(int Id, string NativeName) : LanguageDto(NativeName);
    ////public record LanguageInfoDto(Language Language, string NativeName);

    //public record AlphabetVariantBodyDto
    //{
    //    public AlphabetFamily AlphabetFamily { get; set; }
    //}

    //public record AlphabetVariantDto : AlphabetVariantBodyDto
    //{
    //    public string LocalizedName { get; set; }
    //}

    //public record AlphabetCharsDto
    //{
    //    public IReadOnlyDictionary<char, bool> CharInfos { get; set; }
    //}

    //public record AlphabetDto : AlphabetCharsDto
    //{
    //    public int LanguageId { get; set; }
    //    public AlphabetDto Alphabet { get; set; }
    //}

    //public record LanguageAlphabetsBodyDto
    //{
    //    public string LanguageNativeName { get; set; }
    //    public IReadOnlyDictionary<AlphabetFamily, AlphabetCharsDto> AlphabetVariants { get; set; }
    //}
    //public record LanguageAlphabetsDto(
    //    FullLanguageDto Language,
    //    IReadOnlyCollection<AlphabetVariantDto> AlphabetVariants);

}
