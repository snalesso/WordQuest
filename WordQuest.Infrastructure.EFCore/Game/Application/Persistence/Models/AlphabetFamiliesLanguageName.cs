using System;
using System.Collections.Generic;

namespace WordQuest.Infrastructure.EFCore.Persistence.MSSQLS.Models
{
    internal partial class AlphabetFamiliesLanguageName
    {
        public int AlphabetFamilyId { get; set; }
        public int LanguageId { get; set; }
        public string Name { get; set; } = null!;
        
        public virtual AlphabetFamily AlphabetFamily { get; set; } = null!;
        public virtual Language Language { get; set; } = null!;
    }
}
