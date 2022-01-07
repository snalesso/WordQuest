using WordQuest.Culture.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Culture.Domain.Persistence
{
    // unicode blocks: https://en.wikipedia.org/wiki/List_of_Unicode_characters
    public class LanguageAlphabets
    {
        public LanguageAlphabets(int languageId, IReadOnlyList<AlphabetVariant> alphabetVariants)
        {
            this.LanguageId = languageId;
            this.AlphabetVariants = alphabetVariants ?? throw new ArgumentNullException(nameof(alphabetVariants));
        }

        public int LanguageId { get; set; }
        // readonly symbolsGroups
        public IReadOnlyList<AlphabetVariant> AlphabetVariants { get; set; }
    }
}
