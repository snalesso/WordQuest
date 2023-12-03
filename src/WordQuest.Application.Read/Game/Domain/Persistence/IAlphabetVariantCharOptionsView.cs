using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface IAlphabetVariantCharOptionsView : IView<ICharOption>
{
    Task<IReadOnlyList<ICharOption>> GetAllAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default);
    Task<IReadOnlyDictionary<char, CharMetadata>> GetCharMetadataMapAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default);
}