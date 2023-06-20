namespace WordQuest.Game.Models;

public partial class TagNamesByLanguage
{
    public int TagId { get; set; }
    public int LanguageId { get; set; }
    public string Name { get; set; } = null!;
}
