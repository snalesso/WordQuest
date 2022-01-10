using System;
using System.Collections.Generic;

namespace WordQuest.Game.Persistence.Models
{
    public partial class LanguageAlphabet
    {
        public int? LanguageId { get; set; }
        public string? LanguageNativeName { get; set; }
        public string? InvariantCultureName { get; set; }
    }
}
