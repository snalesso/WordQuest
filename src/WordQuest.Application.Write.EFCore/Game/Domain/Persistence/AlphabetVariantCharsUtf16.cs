using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class AlphabetVariantCharsUtf16
{
    public Guid AlphabetVariantId { get; set; }

    public char Char { get; set; }

    public bool IsCommon { get; set; }

    public virtual AlphabetVariant AlphabetVariant { get; set; } = null!;
}
