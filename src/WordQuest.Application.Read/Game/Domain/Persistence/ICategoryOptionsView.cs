using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface ICategoryOptionsView : ICollectionView<ICategoryOption, Guid>
{
    // TODO: strongly type ids
    Task<IReadOnlyList<ICategoryOption>> GetAllAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default);
}
