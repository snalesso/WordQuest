using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Common.Application;
using WordQuest.Culture.Domain.Writing.Entities;

namespace WordQuest.Game.Domain.Persistence;

public interface IAlphabetVariantsView : IView<AlphabetVariant>
{
    Task<IEnumerable<AlphabetVariant>> GetAsync(int alphabetVariantId, CancellationToken cancellationToken = default);
}