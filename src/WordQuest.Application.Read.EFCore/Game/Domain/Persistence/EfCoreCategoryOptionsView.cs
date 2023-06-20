using Microsoft.EntityFrameworkCore;
using WordQuest.Domain.Persistence;
//using Category = WordQuest.Game.Persistence.Category;

namespace WordQuest.Game.Domain.Persistence;

public class EfCoreCategoryOptionsView : ICategoryOptionsView
{
    private readonly DbSet<Category> _categories;

    public EfCoreCategoryOptionsView(DbSet<Category> categories)
    {
        this._categories = categories ?? throw new ArgumentNullException(nameof(categories));
    }

    public async Task<IReadOnlyList<Domain.CategoryOption>> GetAllAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default)
    {
        //throw new NotImplementedException();
        var cats = await this._categories.Where(x => x.AlphabetVariantId == alphabetVariantId).ToArrayAsync(cancellationToken);
        if (cats is null)
            return new Domain.CategoryOption[] { };

        return cats.Select(cat => new Domain.CategoryOption(cat.Id, cat.Name, cat.Description)).ToArray();
    }

    public Task<Domain.CategoryOption?> GetAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
        //var cat = await this._categories.FindAsync(identity, cancellationToken);
        //if (cat is null)
        //    return null;

        //return new CategoryOption(cat.Id, cat.Name, cat.Description);
    }

    public Task<IReadOnlyList<Domain.CategoryOption>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
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
