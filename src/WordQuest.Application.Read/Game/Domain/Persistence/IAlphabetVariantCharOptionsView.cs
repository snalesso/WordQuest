using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface IAlphabetVariantCharOptionsView : IView<ICharOption>
{
    Task<IReadOnlyList<ICharOption>> GetAllAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default);
}