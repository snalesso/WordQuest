namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreAlphabetFamiliesLanguageName
{
    public int AlphabetFamilyId { get; set; }

    public short LanguageId { get; set; }

    public string Name { get; set; } = null!;

    public virtual EfCoreAlphabetFamily AlphabetFamily { get; set; } = null!;

    public virtual EfCoreLanguage Language { get; set; } = null!;
}
