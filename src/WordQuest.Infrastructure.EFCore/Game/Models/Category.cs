using System;
using System.Collections.Generic;

namespace WordQuest.Game.Persistence.Models
{
    public partial class Category
    {
        public Category()
        {
            Tags = new HashSet<Tag>();
        }

        public int Id { get; set; }
        public int LanguageId { get; set; }
        public int AlphabetFamilyId { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        public virtual AlphabetFamily AlphabetFamily { get; set; } = null!;
        public virtual Language Language { get; set; } = null!;

        public virtual ICollection<Tag> Tags { get; set; }
    }
}
