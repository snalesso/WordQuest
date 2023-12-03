namespace WordQuest.Game.Domain.Persistence;

public interface ICategory
{
    EfCoreAlphabetVariant AlphabetVariant { get; set; }
    Guid AlphabetVariantId { get; set; }
    string? Description { get; set; }
    Guid Id { get; set; }
    string Name { get; set; }
}