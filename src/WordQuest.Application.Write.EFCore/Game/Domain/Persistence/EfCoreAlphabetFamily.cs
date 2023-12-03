namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreAlphabetFamily
{
    public int Id { get; set; }

    public string InvariantCultureName { get; set; } = null!;

    public virtual ICollection<EfCoreAlphabetFamiliesLanguageName> AlphabetFamiliesLanguageNames { get; } = new List<EfCoreAlphabetFamiliesLanguageName>();

    public virtual ICollection<EfCoreAlphabetVariant> AlphabetVariants { get; } = new List<EfCoreAlphabetVariant>();
}
