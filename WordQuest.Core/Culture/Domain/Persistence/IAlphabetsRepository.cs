using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Culture.Domain;
using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Culture.Domain.Persistence
{
    public interface IAlphabetsRepository
    {
        Task<IEnumerable<AlphabetVariant>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<AlphabetVariant>> GetAsync(LCID lcid, CancellationToken cancellationToken = default);
    }
}
