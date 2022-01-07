using System;
using System.Collections.Generic;

namespace WordQuest.Infrastructure.EFCore.Persistence.MSSQLS.Models
{
    internal partial class TagNamesByLanguage
    {
        public int TagId { get; set; }
        public int LanguageId { get; set; }
        public string Name { get; set; } = null!;
    }
}
