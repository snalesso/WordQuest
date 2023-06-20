using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class Language
{
    public short Id { get; set; }

    public string? NativeName { get; set; }

    public virtual ICollection<AlphabetFamiliesLanguageName> AlphabetFamiliesLanguageNames { get; } = new List<AlphabetFamiliesLanguageName>();

    public virtual ICollection<AlphabetVariant> AlphabetVariants { get; } = new List<AlphabetVariant>();
}
