namespace WordQuest.Game.Models;

public partial class AlphabetFamiliesLanguageName
{
    public int AlphabetFamilyId { get; set; }
    public int LanguageId { get; set; }
    public string Name { get; set; } = null!;

    public virtual AlphabetFamily AlphabetFamily { get; set; } = null!;
    public virtual Language Language { get; set; } = null!;
}
