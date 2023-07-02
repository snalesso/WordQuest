namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreCategory
{
    public Guid Id { get; set; }
    public Guid AlphabetVariantId { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }

    public virtual EfCoreAlphabetVariant AlphabetVariant { get; set; } = null!;
}
