using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Culture.Domain.Persistence;

public interface ILanguagesRepository
{
    Task<IEnumerable<Language>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Language> GetAsync(int id, CancellationToken cancellationToken = default);
}
