using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public interface ICategory : IEntity<Guid>
{
    IAlphabetVariant AlphabetVariant { get; set; }
    string Name { get; set; }
    string? Description { get; set; }
    Guid AlphabetVariantId { get; set; }
}