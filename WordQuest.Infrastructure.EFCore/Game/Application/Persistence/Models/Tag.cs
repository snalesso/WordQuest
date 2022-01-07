using System;
using System.Collections.Generic;

namespace WordQuest.Infrastructure.EFCore.Persistence.MSSQLS.Models
{
    internal partial class Tag
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
