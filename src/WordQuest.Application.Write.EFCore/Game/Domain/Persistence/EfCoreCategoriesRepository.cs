using Microsoft.EntityFrameworkCore;
using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public class EfCoreCategoriesRepository : ICategoriesRepository
{
    private readonly DbSet<Category> _categories;

    public EfCoreCategoriesRepository(DbSet<Category> categories)
    {
        this._categories = categories ?? throw new ArgumentNullException(nameof(categories));
    }

    public async Task AddAsync(Category entity, CancellationToken cancellationToken = default)
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

    public Task UpdateAsync(Category entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task RemoveAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<Category?> GetAsync(Guid identity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Category>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task AddAsync(Domain.ICategory entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Domain.ICategory entity, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    Task<Domain.ICategory?> IRepository<Domain.ICategory, Guid>.GetAsync(Guid identity, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }

    Task<IReadOnlyList<Domain.ICategory>> IRepository<Domain.ICategory, Guid>.GetAllAsync(CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
