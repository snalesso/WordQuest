using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Culture.Application.DTOs;
using WordQuest.Game.Application.DTOs;

namespace WordQuest.Game.Application.Services
{
    public interface IMatchCreationService
    {
        Task<IEnumerable<LanguageDto>> GetLanguagesAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<AlphabetInfo>> GetAlphabetVariantsAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<AlphabetInfo>> GetAlphabetVariantsAsync(int languageId, CancellationToken cancellationToken = default);

        Task<IEnumerable<Category>> GetRandomCategories(int alphabetId, ushort count, CancellationToken cancellationToken = default);
    }
}
