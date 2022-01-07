using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Culture.Application.DTOs;
using WordQuest.Game.Application.DTOs;
using WordQuest.Game.Application.Services;

namespace WordQuest.Game.Application.Services
{
    public class MatchCreationService : IMatchCreationService
    {
        public Task<IEnumerable<AlphabetInfo>> GetAlphabetVariantsAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AlphabetInfo>> GetAlphabetVariantsAsync(int languageId, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<LanguageDto>> GetLanguagesAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Category>> GetRandomCategories(int alphabetId, ushort count, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
