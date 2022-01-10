using System;
using System.Collections.Generic;

namespace WordQuest.Game.Persistence.Models
{
    public partial class Tag
    {
        public Tag()
        {
            Categories = new HashSet<Category>();
        }

        public int Id { get; set; }
        public string InvariantCultureName { get; set; } = null!;

        public virtual ICollection<Category> Categories { get; set; }
    }
}
