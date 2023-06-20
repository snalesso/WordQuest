using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface ICategoryOptionsView : IView<CategoryOption, Guid>
{
    // TODO: strongly type ids
    Task<IReadOnlyList<CategoryOption>> GetAllAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default);
}
