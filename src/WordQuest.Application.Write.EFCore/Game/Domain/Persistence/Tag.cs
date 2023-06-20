using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Persistence;

public partial class Tag
{
    public int Id { get; set; }

    public string InvariantCultureName { get; set; } = null!;

    public virtual ICollection<CategoriesTag> CategoriesTags { get; } = new List<CategoriesTag>();
}
