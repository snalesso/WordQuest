namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreTagName
{
    public int TagId { get; set; }
    public string InvariantCultureName { get; set; } = null!;
    public short? LanguageId { get; set; }
    public string? NativeLanguageName { get; set; }
    public string? TagName1 { get; set; }
}
