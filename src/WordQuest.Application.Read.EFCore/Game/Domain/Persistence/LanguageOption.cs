using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class LanguageOption
{
    public short Id { get; set; }

    public string? NativeName { get; set; }
}
