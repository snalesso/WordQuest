using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Culture.Domain.Writing.Entities;

namespace WordQuest.Game.Domain.Persistence;

public interface IReadLanguagesRepository
{
    Task<IReadOnlyList<Language>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Language> GetAsync(int id, CancellationToken cancellationToken = default);
}