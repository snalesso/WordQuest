using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

internal class InMemoryDbSeeder
{
    public static async Task SeedAsync(IWriteGameUnitOfWork unitOfWork, CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(unitOfWork);

        // langs
        var langIdMap = Languages.All.ToDictionary(lang => lang, _ => null as int?);
        foreach (var readyLang in langIdMap.Keys)
        {
            var lang = await unitOfWork.Languages.CreateAsync(new LanguageCreationParams(readyLang.NativeName, readyLang.AlphabetVariants), cancellationToken);
            var langId = await unitOfWork.Languages.AddAsync(lang, cancellationToken);
            langIdMap[readyLang] = langId;
        }

        // alphabet variants
        foreach (var readyAlphVar in AlphabetVariants.All)
        {
            var langId = langIdMap[readyAlphVar.Language].Value;
            var lang = await unitOfWork.Languages.GetAsync(langId, cancellationToken);
            var alphabetVariant = await unitOfWork.AlphabetVariants.CreateAsync(
                new AlphabetVariantCreationParams(readyAlphVar.AlphabetFamilyId, readyAlphVar.CharMetadataMap, lang),
                cancellationToken);
            await unitOfWork.AlphabetVariants.AddAsync(alphabetVariant, cancellationToken);
        }

        // tags

        // categories

        // users

        // matches
    }
}
