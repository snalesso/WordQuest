using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class AlphabetFamily
{
    public int Id { get; set; }

    public string InvariantCultureName { get; set; } = null!;

    public virtual ICollection<AlphabetFamiliesLanguageName> AlphabetFamiliesLanguageNames { get; } = new List<AlphabetFamiliesLanguageName>();

    public virtual ICollection<AlphabetVariant> AlphabetVariants { get; } = new List<AlphabetVariant>();
}
