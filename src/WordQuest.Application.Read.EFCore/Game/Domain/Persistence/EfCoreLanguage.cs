namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreLanguage
{
    public short Id { get; set; }
    public string NativeName { get; set; } = null!;

    public virtual ICollection<EfCoreAlphabetFamiliesLanguageName> AlphabetFamiliesLanguageNames { get; } = new List<EfCoreAlphabetFamiliesLanguageName>();
    public virtual ICollection<EfCoreAlphabetVariant> AlphabetVariants { get; } = new List<EfCoreAlphabetVariant>();
}
