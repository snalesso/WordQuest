using Microsoft.EntityFrameworkCore;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public class EfCoreCategoriesRepository : ICategoriesRepository
{
    private readonly DbSet<Category> _categories;

    public EfCoreCategoriesRepository(DbSet<Category> categories)
    {
        this._categories = categories ?? throw new ArgumentNullException(nameof(categories));
    }

    public async Task AddAsync(Entities.Category entity, CancellationToken cancellationToken = default)
    {
        await this._categories.AddAsync(
            new Category
            {
                Id = entity.Id,
                Description = entity.Description,
                Name = entity.Name,
                AlphabetVariantId = entity.AlphabetVariant.Id,
            },
            cancellationToken);
    }

    public Task UpdateAsync(Entities.Category entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task RemoveAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<Entities.Category?> GetAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Entities.Category>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
