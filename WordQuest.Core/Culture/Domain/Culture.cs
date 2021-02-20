using System;
using System.Collections.Generic;

namespace WordQuest.Culture.Domain
{
    //new LanguageDto(1, "Italiano"),
    //new LanguageDto(2, "English"),
    //new LanguageDto(3, "Español"),
    //new LanguageDto(4, "Français"),
    //new LanguageDto(5, "Deutsch"),
    //new LanguageDto(6, "Русский")
    public enum LCID : int
    {
        German = 1031,
        English = 1033,
        Spanish = 1034,
        French = 1036,
        Italian = 1040,
        Russian = 1049
    }

    public class Language
    {
        public int Id { get; set; }

        public string NativeName { get; set; }

        public LCID LCID { get; set; }
        public string ISO_639_1 { get; set; }
        public string ISO_639_2B { get; set; }
        public string ISO_639_2T { get; set; }
        public string ISO_639_3 { get; set; }

        public IReadOnlyList<AlphabetVariant> AlphabetVariants { get; set; }
    }

    public class SymbolsGroup
    {
        public int Id { get; set; }
        public string Description { get; set; }
        [Obsolete("temporary: on net5 use IReadOnlySet")]
        public ISet<char> Chars_UTF16 { get; set; }
        public Range<char> Chars_UTF16_generator { get; set; }
    }

    public class AlphabetVariant
    {
        public int LanguageId { get; }
        public IReadOnlyDictionary<char, bool> CharInfos { get; }
    }

    public class CharInfo
    {
        public char Char { get; set; }
        public bool IsUncommon { get; set; }
    }
}
