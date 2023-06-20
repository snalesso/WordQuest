namespace WordQuest.Game.Models;

public partial class Language
{
    public Language()
    {
        this.AlphabetFamiliesLanguageNames = new HashSet<AlphabetFamiliesLanguageName>();
        this.AlphabetVariants = new HashSet<AlphabetVariant>();
        this.Categories = new HashSet<Category>();
    }

    public int Id { get; set; }
    public string NativeName { get; set; }

    public virtual ICollection<AlphabetFamiliesLanguageName> AlphabetFamiliesLanguageNames { get; set; }
    public virtual ICollection<AlphabetVariant> AlphabetVariants { get; set; }
    public virtual ICollection<Category> Categories { get; set; }
}
