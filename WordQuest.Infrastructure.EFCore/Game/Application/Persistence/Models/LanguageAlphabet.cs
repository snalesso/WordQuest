using System;
using System.Collections.Generic;

namespace WordQuest.Infrastructure.EFCore.Persistence.MSSQLS.Models
{
    internal partial class LanguageAlphabet
    {
        public int? LanguageId { get; set; }
        public string? LanguageNativeName { get; set; }
        public string? InvariantCultureName { get; set; }
    }
}
