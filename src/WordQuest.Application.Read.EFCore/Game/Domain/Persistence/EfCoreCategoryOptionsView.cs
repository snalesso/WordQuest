using Microsoft.EntityFrameworkCore;
using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

// TODO: IAsyncEnumerable
// TODO: ToArrayAsync vs ToListAsync

internal class EfCoreCategoryOptionsView : ICategoryOptionsView
{
    private readonly DbSet<EfCoreCategory> _categories;

    public EfCoreCategoryOptionsView(DbSet<EfCoreCategory> categories)
    {
        this._categories = categories ?? throw new ArgumentNullException(nameof(categories));
    }

    public async Task<IReadOnlyList<ICategoryOption>> GetAllAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default)
    {
        var alphabetVariants = await this._categories
            .Where(x => x.AlphabetVariantId == alphabetVariantId)
            .Select(x => new CategoryOption(x.Id, x.Name, x.Description))
            .ToArrayAsync(cancellationToken)
            .ConfigureAwait(false);
        return alphabetVariants;
    }

    public async Task<ICategoryOption> GetAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        var cat = await this._categories
            .FindAsync(identity, cancellationToken)
            .ConfigureAwait(false)
            ?? throw new EntityNotFoundException();

        var result = new CategoryOption(cat.Id, cat.Name, cat.Description);
        return result;
    }

    public async Task<IReadOnlyList<ICategoryOption>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var categoryOptions = await this._categories
            .Select(c => new CategoryOption
            {
                Id = c.Id,
                Description = c.Description,
                Name = c.Name
            })
            .ToArrayAsync(cancellationToken)
            .ConfigureAwait(false);
        return categoryOptions;
    }

    //public Task<IReadOnlyList<CategoryOption>> GetAllAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default)
    //{
    //    var alphabetVariant = AlphabetVariants.All.FirstOrDefault(x => x.Id == alphabetVariantId);
    //    if (alphabetVariant is null)
    //        throw new KeyNotFoundException();

    //    var categoryNames = alphabetVariant.Language.Id switch
    //    {
    //        (int)LCID.Italian => Categories.Italian,
    //        (int)LCID.German => Categories.German,
    //        (int)LCID.Spanish => Categories.Spanish,
    //        (int)LCID.French => Categories.French,
    //        (int)LCID.Russian => Categories.Russian,
    //        _ => Categories.English
    //    };
    //    int i = 1;
    //    var categoryOptions = categoryNames
    //        .Select(c =>
    //        {
    //            return new CategoryOption(
    //                Guid.NewGuid(),
    //                c,
    //                ImmutableHashSet<int>.Empty,
    //                $"Description #");
    //        })
    //        .ToArray();

    //    return Task.FromResult<IReadOnlyList<CategoryOption>>(categoryOptions);
    //}
}
