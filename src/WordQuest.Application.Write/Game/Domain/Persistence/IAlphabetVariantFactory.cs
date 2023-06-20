using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public interface IAlphabetVariantFactory
{
    Task<AlphabetVariant> CreateAsync(AlphabetVariantCreationParams creationParams, CancellationToken cancellationToken = default);
}