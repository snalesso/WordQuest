using Microsoft.EntityFrameworkCore;
using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public class EfCoreAlphabetVariantsRepository : IAlphabetVariantsRepository
{
    private readonly DbSet<EfCoreAlphabetVariant> _alphabetVariants;

    public EfCoreAlphabetVariantsRepository(DbSet<EfCoreAlphabetVariant> alphabetVariants)
    {
        this._alphabetVariants = alphabetVariants ?? throw new ArgumentNullException(nameof(alphabetVariants));
    }

    public Task AddAsync(IAlphabetVariant entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(IAlphabetVariant entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task RemoveAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IAlphabetVariant?> GetAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<IAlphabetVariant>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
