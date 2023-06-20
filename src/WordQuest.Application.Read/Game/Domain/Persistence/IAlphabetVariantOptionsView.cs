using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface IAlphabetVariantOptionsView : IView<AlphabetVariantOption>
{
    Task<IReadOnlyList<AlphabetVariantOption>> GetAllAsync(short languageId, CancellationToken cancellationToken = default);
    Task<AlphabetVariantOption?> GetAsync(Guid id, CancellationToken cancellationToken = default);
}