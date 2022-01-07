using System;
using System.Collections.Generic;

namespace WordQuest.Infrastructure.EFCore.Persistence.MSSQLS.Models
{
    internal partial class AlphabetVariant
    {
        public AlphabetVariant()
        {
            AlphabetVariantCharsUtf16s = new HashSet<AlphabetVariantCharsUtf16>();
        }

        public int Id { get; set; }
        public int LanguageId { get; set; }
        public int AlphabetFamilyId { get; set; }

        public virtual AlphabetFamily AlphabetFamily { get; set; } = null!;
        public virtual Language Language { get; set; } = null!;
        public virtual ICollection<AlphabetVariantCharsUtf16> AlphabetVariantCharsUtf16s { get; set; }
    }
}
