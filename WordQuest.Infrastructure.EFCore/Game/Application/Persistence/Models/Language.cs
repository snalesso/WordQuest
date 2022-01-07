using System;
using System.Collections.Generic;

namespace WordQuest.Infrastructure.EFCore.Persistence.MSSQLS.Models
{
    internal partial class Language
    {
        public Language()
        {
            AlphabetFamiliesLanguageNames = new HashSet<AlphabetFamiliesLanguageName>();
            AlphabetVariants = new HashSet<AlphabetVariant>();
            Categories = new HashSet<Category>();
        }

        public int Id { get; set; }
        public string NativeName { get; set; } = null!;
        
        public virtual ICollection<AlphabetFamiliesLanguageName> AlphabetFamiliesLanguageNames { get; set; }
        public virtual ICollection<AlphabetVariant> AlphabetVariants { get; set; }
        public virtual ICollection<Category> Categories { get; set; }
    }
}
