using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class AlphabetFamiliesLanguageName
{
    public int AlphabetFamilyId { get; set; }

    public short LanguageId { get; set; }

    public string Name { get; set; } = null!;

    public virtual AlphabetFamily AlphabetFamily { get; set; } = null!;

    public virtual Language Language { get; set; } = null!;
}
