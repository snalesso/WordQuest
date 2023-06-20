using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class CategoriesTag
{
    public int TagId { get; set; }

    public Guid Id { get; set; }

    public Guid CategoryId { get; set; }

    public virtual Tag Tag { get; set; } = null!;
}
