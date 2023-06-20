using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Services;

public  class MatchCreationService : IMatchCreationService
{
    private readonly IReadOnlyUnitOfWorkFactory<IReadOnlyGameDbConnectionContext> _readOnlyUnitOfWorkFactory;
    private readonly IReadWriteUnitOfWorkFactory<IGameDbConnectionContext> _unitOfWorkFactory;

    //private readonly ILanguageOptionsView _languagesRepository;
    //private readonly IAlphabetOptionsView _alphabetVariantsRepository;

    //public InMemoryMatchConfigService(
    //    ILanguageOptionsView languagesRepository,
    //    IAlphabetOptionsView alphabetsRepository)
    //{
    //    this._languagesRepository = languagesRepository ?? throw new ArgumentNullException(nameof(languagesRepository));
    //    this._alphabetVariantsRepository = alphabetsRepository ?? throw new ArgumentNullException(nameof(alphabetsRepository));
    //}

    public MatchCreationService(
        IReadOnlyUnitOfWorkFactory<IReadOnlyGameDbConnectionContext> readOnlyUnitOfWorkFactory
        , IReadWriteUnitOfWorkFactory<IGameDbConnectionContext> unitOfWorkFactory)
    {
        this._readOnlyUnitOfWorkFactory = readOnlyUnitOfWorkFactory ?? throw new ArgumentNullException(nameof(readOnlyUnitOfWorkFactory));
        this._unitOfWorkFactory = unitOfWorkFactory ?? throw new ArgumentNullException(nameof(unitOfWorkFactory));
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

    public async Task<IReadOnlyList<LanguageOption>> GetLanguageOptionsAsync(
        CancellationToken cancellationToken = default)
    {
        await using (var uow = await this._readOnlyUnitOfWorkFactory.CreateAsync(cancellationToken))
        {
            return await uow.Context.LanguageOptions.GetAllAsync(cancellationToken);
        }
    }

    public async Task<IReadOnlyList<CategoryOption>> GetRandomCategories(
        Guid alphabetVariantId,
        ushort count,
        CancellationToken cancellationToken = default)
    {
        await using (var uow = await this._readOnlyUnitOfWorkFactory.CreateAsync(cancellationToken))
        {
            return await uow.Context.CategoryOptions.GetAllAsync(alphabetVariantId, cancellationToken);
        }
    }

    public async Task<IReadOnlyList<AlphabetVariantOption>> GetAlphabetVariantOptionsAsync(
        CancellationToken cancellationToken = default)
    {
        await using (var uow = await this._readOnlyUnitOfWorkFactory.CreateAsync(cancellationToken))
        {
            try
            {
                var result = await uow.Context.AlphabetVariantOptions.GetAllAsync(cancellationToken);
                return result;
            }
            catch (Exception ex) when (Track(ex))
            {
                throw;
            }
        }
    }

    static bool Track(Exception ex)
    {
        Console.WriteLine("AAA", ex);
        return true;
    }

    public async Task SeedCategories(CancellationToken cancellationToken = default)
    {
        await using (var uow = await this._unitOfWorkFactory.CreateAsync(cancellationToken))
        {
            try
            {
                var categories = new[]
                {
                    "cities",
                    "animals",
                    "person names",
                    "elements and compounds",
                    "mithology",
                    "hobbies",
                    "adjectives",
                    "plants, flowers & fruits",
                    "war weapons",
                    "Pokémon",
                    "Pokémon spells",
                    "League of Legends' champions",
                    "hobbies",
                    "diseases",
                    "alcoholics",
                    "capitals",
                    "rivers & lakes",
                    "mountains & ranges",
                    "sex quotes",
                    "ways to die",
                    "soccer players",
                    "movies",
                    "cartoons",
                    "food brands",
                    "superheroes",
                    "precious gems",
                    "books",
                    "songs",
                    "languages",
                    "countries",
                    "movie stars",
                    "4 letters words",
                    "home objects",
                    "jobs",
                    "singers & bands",
                    "vehicles"
                }
                .ToHashSet();

                await uow.TransactionalAsync(
                    async (ctx, ct) =>
                    {
                        var alphabetVariants = await ctx.AlphabetVariants.GetAllAsync(ct);

                        foreach (var variant in alphabetVariants)
                        {
                            foreach (var cat in categories)
                            {
                                var newCategory = new Domain.Entities.Category(
                                    variant,
                                    cat,
                                    null,
                                    new HashSet<int>(),
                                    false);
                                await ctx.Categories.AddAsync(newCategory, cancellationToken);
                            }
                        }
                    },
                    cancellationToken);
            }
            catch (Exception ex) when (Track(ex))
            {
                throw;
            }
        }
    }
}
