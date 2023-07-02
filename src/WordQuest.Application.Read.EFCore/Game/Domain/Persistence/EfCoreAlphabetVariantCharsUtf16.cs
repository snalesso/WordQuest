namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreAlphabetVariantCharsUtf16
{
    public Guid AlphabetVariantId { get; set; }
    public string Char { get; set; } = null!;
    public bool IsCommon { get; set; }

    public virtual EfCoreAlphabetVariant AlphabetVariant { get; set; } = null!;
}
