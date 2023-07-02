using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace WordQuest.Game.Domain.Persistence;

public interface IReadCategoriesTagsRepository
{
    Task<IReadOnlyList<CategoryTagAssociation>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlySet<int>> GetAllAsync(int categoryId, CancellationToken cancellationToken = default);
}
