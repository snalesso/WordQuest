using WordQuest.Culture.Application.DTOs;
using WordQuest.Culture.Domain.Persistence;
using WordQuest.Game.Application.DTOs;

namespace WordQuest.Game.Application.Services
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

        public async Task<IEnumerable<AlphabetInfo>> GetAlphabetVariantsAsync(CancellationToken cancellationToken = default)
        {
            var alphabets = await this._alphabetsRepository.GetAllAsync(cancellationToken);
            return from alph in alphabets
                   select new AlphabetInfo(
                       //alph.Id,
                       alph.NativeName,
                       new()
                       {
                           Id = alph.Id,
                           NativeName = alph.NativeName,
                       },
                       alph.CharInfos.Select(ci => new CharInfoDto() { Char = ci.Key, IsUncommon = ci.Value }));
        }

        public async Task<IEnumerable<AlphabetInfo>> GetAlphabetVariantsAsync(int languageId, CancellationToken cancellationToken = default)
        {
            return from alph in await this._alphabetsRepository.GetAllAsync(cancellationToken)
                   where alph.LanguageId == languageId
                   select new AlphabetInfo(
                       //alph.Id,
                       alph.NativeName,
                       new()
                       {
                           Id = alph.Id,
                           NativeName = alph.NativeName,
                       },
                       alph.CharInfos.Select(ci => new CharInfoDto() { Char = ci.Key, IsUncommon = ci.Value }));
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
