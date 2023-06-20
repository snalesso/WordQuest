using Microsoft.EntityFrameworkCore;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public class EfCoreAlphabetVariantsRepository : IAlphabetVariantsRepository
{
    private readonly DbSet<AlphabetVariant> _alphabetVariants;

    public EfCoreAlphabetVariantsRepository(DbSet<AlphabetVariant> alphabetVariants)
    {
        this._alphabetVariants = alphabetVariants ?? throw new ArgumentNullException(nameof(alphabetVariants));
    }

    public Task AddAsync(Entities.AlphabetVariant entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Entities.AlphabetVariant entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task RemoveAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<Entities.AlphabetVariant?> GetAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task<IReadOnlyList<Entities.AlphabetVariant>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var results = await this._alphabetVariants
            .Include(x => x.Language)
            .Include(x => x.AlphabetVariantCharsUtf16s)
            .ToArrayAsync(cancellationToken);
        return results
            .AsParallel()
            .Where(alpVar => alpVar.AlphabetVariantCharsUtf16s.Any())
            .Select(alpVar =>
            {
                var language = new Entities.Language(alpVar.Language.Id, alpVar.Language.NativeName);
                var metadataMap = new Dictionary<char, CharMetadata>(
                    alpVar.AlphabetVariantCharsUtf16s.Select(x => new KeyValuePair<char, CharMetadata>(x.Char, new CharMetadata(x.IsCommon))));
                var map = new Entities.AlphabetVariant(alpVar.Id, language, metadataMap, alpVar.AlphabetFamilyId);
                return map;
            })
            .ToArray();
    }

    public Task<Entities.AlphabetVariant> CreateAsync(AlphabetVariantCreationParams creationParams, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
