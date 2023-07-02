namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreLanguageAlphabet
{
    public short? LanguageId { get; set; }
    public string? LanguageNativeName { get; set; }
    public string? InvariantCultureName { get; set; }
}
