namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreTagNamesByLanguage
{
    public int TagId { get; set; }
    public short LanguageId { get; set; }
    public string Name { get; set; } = null!;
}
