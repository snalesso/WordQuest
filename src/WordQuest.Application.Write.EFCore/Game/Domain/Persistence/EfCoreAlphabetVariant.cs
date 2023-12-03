using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreAlphabetVariant
{
    public Guid Id { get; set; }

    public short LanguageId { get; set; }

    public int AlphabetFamilyId { get; set; }

    public virtual EfCoreAlphabetFamily AlphabetFamily { get; set; } = null!;

    public virtual ICollection<AlphabetVariantCharsUtf16> AlphabetVariantCharsUtf16s { get; } = new List<AlphabetVariantCharsUtf16>();

    public virtual ICollection<Category> Categories { get; } = new List<Category>();

    public virtual EfCoreLanguage Language { get; set; } = null!;
}
