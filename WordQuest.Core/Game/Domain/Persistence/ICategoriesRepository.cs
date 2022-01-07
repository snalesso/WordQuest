using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence
{
    public interface ICategoriesRepository
    {
        Task<IEnumerable<Category>> GetAllAsync(int languageId, CancellationToken cancellationToken = default);
    }
}
