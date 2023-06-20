namespace WordQuest.Game.Models;

public partial class Category
{
    public Category()
    {
        this.Tags = new HashSet<Tag>();
    }

    public Guid Id { get; set; }
    public int LanguageId { get; set; }
    public int AlphabetFamilyId { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public virtual AlphabetVariant AlphabetVariant { get; set; } = null!;
    public virtual AlphabetFamily AlphabetFamily { get; set; } = null!;
    public virtual Language Language { get; set; } = null!;

    public virtual ICollection<Tag> Tags { get; set; }
}
