using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public class EfCoreLanguagesRepository : ILanguagesRepository
{
    public Task AddAsync(Domain.Language entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Domain.Language entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task RemoveAsync(short identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<Domain.Language?> GetAsync(short identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Domain.Language>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}