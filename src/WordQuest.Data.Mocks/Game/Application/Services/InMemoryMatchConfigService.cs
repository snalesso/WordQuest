using WordQuest.Culture.Domain.Persistence;
using WordQuest.Culture.DTOs;
using WordQuest.Game.Services;
using WordQuest.Game.DTOs;

namespace WordQuest.Data.Mocks.Game.Application.Services
{
    public class InMemoryMatchConfigService : IMatchCreationService
    {
        private readonly ILanguagesRepository _languagesRepository;
        private readonly IAlphabetsRepository _alphabetsRepository;

        public InMemoryMatchConfigService(
            ILanguagesRepository languagesRepository,
            IAlphabetsRepository alphabetsRepository)
        {
            this._languagesRepository = languagesRepository ?? throw new ArgumentNullException(nameof(languagesRepository));
            this._alphabetsRepository = alphabetsRepository ?? throw new ArgumentNullException(nameof(alphabetsRepository));
        }

        public async Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(CancellationToken cancellationToken = default)
        {
            var alphabets = await this._alphabetsRepository.GetAllAsync(cancellationToken);
            return (from alph in alphabets
                    select new AlphabetInfo(
                        //alph.Id,
                        alph.NativeName,
                        new(alph.Id, alph.NativeName),
                        alph.CharInfos.Select(ci => new CharInfo(ci.Key, ci.Value))))
                   .ToArray();
        }

        public async Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(int languageId, CancellationToken cancellationToken = default)
        {
            return (from alph in await this._alphabetsRepository.GetAllAsync(cancellationToken)
                    where alph.LanguageId == languageId
                    select new AlphabetInfo(
                        //alph.Id,
                        alph.NativeName,
                        new(alph.Id, alph.NativeName),
                        alph.CharInfos.Select(ci => new CharInfo(ci.Key, ci.Value))))
                   .ToArray();
        }

        public Task<IReadOnlyList<LanguageOption>> GetLanguageOptionsAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Category>> GetRandomCategories(int alphabetId, ushort count, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
