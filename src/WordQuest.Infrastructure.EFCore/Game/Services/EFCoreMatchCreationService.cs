using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordQuest.Culture.DTOs;
using WordQuest.Game.DTOs;

namespace WordQuest.Game.Services;

public class EFCoreMatchCreationService : IMatchCreationService
{


    public Task<IReadOnlyList<LanguageOption>> GetLanguageOptionsAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(int languageId, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<Category>> GetRandomCategories(int alphabetId, ushort count, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
