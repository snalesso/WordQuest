using WordQuest.Culture.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace WordQuest.Culture.Persistence
{
    // unicode blocks: https://en.wikipedia.org/wiki/List_of_Unicode_characters
    public class LanguageAlphabets
    {
        public int LanguageId { get; set; }
        // readonly symbolsGroups
        public AlphabetVariant[] AlphabetVariants { get; set; }
    }
}
