using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class TagNamesByLanguage
{
    public int TagId { get; set; }

    public short LanguageId { get; set; }

    public string Name { get; set; } = null!;
}
