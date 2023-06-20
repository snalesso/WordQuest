using WordQuest.Game.Domain;

namespace WordQuest.Game.Services;

public interface IMatchCreationService
{
    Task<IReadOnlyList<LanguageOption>> GetLanguageOptionsAsync(CancellationToken cancellationToken = default);

    //Task<IReadOnlyList<AlphabetOption>> GetAlphabetOptionsAsync(CancellationToken cancellationToken = default);
    //Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyList<AlphabetVariantOption>> GetAlphabetVariantOptionsAsync(CancellationToken cancellationToken = default);
    //Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(int languageId, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<CategoryOption>> GetRandomCategories(Guid alphabetVariantId, ushort count, CancellationToken cancellationToken = default);

    Task SeedCategories(CancellationToken cancellationToken = default);
}
