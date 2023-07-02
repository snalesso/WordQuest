using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain.Dtos;
using WordQuest.Game.Domain.Persistence;
using WordQuest.Game.Services;

namespace WordQuest.Game.Application.Services;

public class InMemoryMatchCreationService : IMatchCreationService
{
    private readonly IReadOnlyUnitOfWorkFactory<IReadOnlyGameDbContext> _readUow;
    private readonly IUnitOfWorkFactory<IGameDbContext> _writeUow;

    //private readonly ILanguageOptionsView _languagesRepository;
    //private readonly IAlphabetOptionsView _alphabetVariantsRepository;

    //public InMemoryMatchConfigService(
    //    ILanguageOptionsView languagesRepository,
    //    IAlphabetOptionsView alphabetsRepository)
    //{
    //    this._languagesRepository = languagesRepository ?? throw new ArgumentNullException(nameof(languagesRepository));
    //    this._alphabetVariantsRepository = alphabetsRepository ?? throw new ArgumentNullException(nameof(alphabetsRepository));
    //}

    public InMemoryMatchCreationService(
        IReadOnlyUnitOfWorkFactory<IReadOnlyGameDbContext> readUow,
        IUnitOfWorkFactory<IGameDbContext> writeUow)
    {
        this._readUow = readUow ?? throw new ArgumentNullException(nameof(readUow));
        this._writeUow = writeUow ?? throw new ArgumentNullException(nameof(writeUow));
    }

    //public async Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(
    //    CancellationToken cancellationToken = default)
    //{
    //    var results = new List<AlphabetInfo>();
    //    var languages = await this._languagesRepository.GetAllAsync(cancellationToken);
    //    foreach (var lang in languages)
    //    {
    //        var langAlphabets = await this._alphabetVariantsRepository.GetAsync(lang.Id, cancellationToken);
    //        foreach (var langAlph in langAlphabets)
    //        {
    //            var alphabetInfo = new AlphabetInfo(
    //                langAlph.NativeName,
    //                new(langAlph.Id, lang.NativeName),
    //                langAlph.CharInfos.Select(ci => new CharInfo(ci.Key, ci.Value)));
    //            results.Add(alphabetInfo);
    //        }
    //    }
    //    return results;
    //}

    //public async Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(
    //    int languageId,
    //    CancellationToken cancellationToken = default)
    //{
    //    return (from alph in await this._alphabetVariantsRepository.GetAllAsync(cancellationToken)
    //            where alph.Id == languageId
    //            select new AlphabetInfo(
    //                //alph.Id,
    //                alph.NativeName,
    //                new(alph.Id, alph.NativeName),
    //                alph.CharInfos.Select(ci => new CharInfo(ci.Key, ci.Value))))
    //           .ToArray();
    //}

    public Task<IReadOnlyList<LanguageOption>> GetLanguageOptionsAsync(
        CancellationToken cancellationToken = default)
    {
        return this._readUow.ExecuteAsync((uow, ct) =>
        {
            return uow.LanguageOptions.GetAllAsync(ct);
        });
    }

    public async Task<IReadOnlyList<CategoryOption>> GetRandomCategories(
        Guid alphabetVariantId,
        ushort count,
        CancellationToken cancellationToken = default)
    {
        await using (var uow = await this._readUow.CreateAsync(cancellationToken))
        {
            return await uow.CategoryOptions.GetAllAsync(alphabetVariantId, cancellationToken);
        }
    }

    public async Task<IReadOnlyList<AlphabetVariantOption>> GetAlphabetVariantOptionsAsync(
        CancellationToken cancellationToken = default)
    {
        await using (var uow = await this._readUow.CreateAsync(cancellationToken))
        {
            return await uow.AlphabetVariantOptions.GetAllAsync(cancellationToken);
        }
    }
}
