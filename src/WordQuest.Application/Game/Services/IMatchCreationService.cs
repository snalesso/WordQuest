using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Culture.DTOs;
using WordQuest.Game.DTOs;

namespace WordQuest.Game.Services
{
    public interface IMatchCreationService
    {
        Task<IReadOnlyList<LanguageOption>> GetLanguageOptionsAsync(CancellationToken cancellationToken = default);

        Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(CancellationToken cancellationToken = default);
        Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(int languageId, CancellationToken cancellationToken = default);

        Task<IReadOnlyList<Category>> GetRandomCategories(int alphabetId, ushort count, CancellationToken cancellationToken = default);
    }
}
