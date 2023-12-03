using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class Category : ICategory
{
    public Guid AlphabetVariantId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public Guid Id { get; set; }

    public virtual EfCoreAlphabetVariant AlphabetVariant { get; set; } = null!;
}
