using System;
using System.Collections.Generic;

namespace WordQuest.Infrastructure.EFCore.Persistence.MSSQLS.Models
{
    internal partial class AlphabetVariantCharsUtf16
    {
        public int AlphabetVariantId { get; set; }
        public short CharCode { get; set; }
        public bool? IsCommon { get; set; }

        public virtual AlphabetVariant AlphabetVariant { get; set; } = null!;
    }
}
