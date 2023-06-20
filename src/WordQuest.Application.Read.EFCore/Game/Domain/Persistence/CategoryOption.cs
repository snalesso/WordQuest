using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class CategoryOption
{
    public Guid Id { get; set; }

    public Guid AlphabetVariantId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }
}
