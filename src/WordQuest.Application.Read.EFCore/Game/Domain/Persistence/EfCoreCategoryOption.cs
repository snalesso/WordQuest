namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreCategoryOption //: GuidEntity, IEntity<Guid>, ICategoryOption
{
    required public Guid Id { get; init; }
    required public Guid AlphabetVariantId { get; init; }
    required public string Name { get; init; }
    required public string? Description { get; init; }
}
