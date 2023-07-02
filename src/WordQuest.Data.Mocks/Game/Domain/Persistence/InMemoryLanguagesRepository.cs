using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public class InMemoryLanguagesRepository : ILanguagesRepository
{
    public Task<Language> CreateAsync(LanguageCreationParams creationParams, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Language>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<Language> UpdateAsync(Language entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<Language> UpdateAsync(IReadOnlyDictionary<string, object> changes, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<Language> GetAsync(ushort id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task RemoveAsync(ushort id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task AddAsync(Language entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
