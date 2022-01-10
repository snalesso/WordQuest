using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public interface ICategoriesRepository
{
    Task<IReadOnlyList<Category>> GetAllAsync(int alphabetId, CancellationToken cancellationToken = default);
    Task<Category> GetAsync(int id, CancellationToken cancellationToken = default);
}
