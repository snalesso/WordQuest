using System;
using System.Collections.Generic;

namespace WordQuest.Infrastructure.EFCore.Persistence.MSSQLS.Models
{
    internal partial class TagName
    {
        public int TagId { get; set; }
        public string InvariantCultureName { get; set; } = null!;
        public int? LanguageId { get; set; }
        public string? NativeLanguageName { get; set; }
        public string? TagName1 { get; set; }
    }
}
