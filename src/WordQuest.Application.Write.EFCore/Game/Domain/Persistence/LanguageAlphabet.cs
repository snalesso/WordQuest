using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class LanguageAlphabet
{
    public short? LanguageId { get; set; }

    public string? LanguageNativeName { get; set; }

    public string? InvariantCultureName { get; set; }
}
