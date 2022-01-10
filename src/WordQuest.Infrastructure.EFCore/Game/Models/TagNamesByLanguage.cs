using System;
using System.Collections.Generic;

namespace WordQuest.Game.Persistence.Models
{
    public partial class TagNamesByLanguage
    {
        public int TagId { get; set; }
        public int LanguageId { get; set; }
        public string Name { get; set; } = null!;
    }
}
