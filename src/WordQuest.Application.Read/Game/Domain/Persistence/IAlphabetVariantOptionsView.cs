using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface IAlphabetVariantOptionsView : ICollectionView<IAlphabetVariantOption>
{
    Task<IReadOnlyList<IAlphabetVariantOption>> GetAllAsync(short languageId, CancellationToken cancellationToken = default);
    Task<IAlphabetVariantOption> GetAsync(Guid id, CancellationToken cancellationToken = default);
}
