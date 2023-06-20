using System.Collections.Immutable;
using WordQuest.Game.Domain.Dtos;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public class InMemoryCategoryOptionsView : ICategoryOptionsView
{
    public Task<IReadOnlyList<CategoryOption>> GetAllAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default)
    {
        var alphabetVariant = AlphabetVariants.All.FirstOrDefault(x => x.Id == alphabetVariantId);
        if (alphabetVariant is null)
            throw new KeyNotFoundException();

        var categoryNames = alphabetVariant.Language.Id switch
        {
            (int)LCID.Italian => Categories.Italian,
            (int)LCID.German => Categories.German,
            (int)LCID.Spanish => Categories.Spanish,
            (int)LCID.French => Categories.French,
            (int)LCID.Russian => Categories.Russian,
            _ => Categories.English
        };
        int i = 1;
        var categoryOptions = categoryNames
            .Select((categoryName, index) =>
            {
                return new CategoryOption(
                    Guid.NewGuid(),
                    categoryName,
                    //ImmutableHashSet<int>.Empty,
                    $"Description #{index + 1}");
            })
            .ToArray();

        return Task.FromResult<IReadOnlyList<CategoryOption>>(categoryOptions);
    }

    public Task<IReadOnlyList<CategoryOption>> GetAllAsync(int alphabetVariantId, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<CategoryOption> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<CategoryOption>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
