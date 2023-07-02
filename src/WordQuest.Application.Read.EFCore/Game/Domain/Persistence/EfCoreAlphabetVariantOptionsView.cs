using Microsoft.EntityFrameworkCore;
using WordQuest.Game.Domain;

namespace WordQuest.Game.Domain.Persistence;

internal class EfCoreAlphabetVariantOptionsView : IAlphabetVariantOptionsView
{
    private readonly DbSet<EfCoreAlphabetVariant> _alphabetVariants;
    private readonly DbSet<EfCoreLanguageAlphabet> _languageAlphabets;
    private readonly DbSet<EfCoreLanguage> _languages;
    private readonly DbSet<EfCoreAlphabetFamily> _alphabetFamilies;

    public EfCoreAlphabetVariantOptionsView(
        DbSet<EfCoreAlphabetVariant> alphabetVariants,
        DbSet<EfCoreLanguageAlphabet> languageAlphabets,
        DbSet<EfCoreLanguage> languages,
        DbSet<EfCoreAlphabetFamily> alphabetFamilies)
    {
        this._alphabetVariants = alphabetVariants ?? throw new ArgumentNullException(nameof(alphabetVariants));
        this._languageAlphabets = languageAlphabets ?? throw new ArgumentNullException(nameof(languageAlphabets));
        this._languages = languages ?? throw new ArgumentNullException(nameof(languages));
        this._alphabetFamilies = alphabetFamilies ?? throw new ArgumentNullException(nameof(alphabetFamilies));
    }

    public async Task<IReadOnlyList<IAlphabetVariantOption>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            var query =
                (from
                    alphVar in this._alphabetVariants
                 join
                     lang in this._languages
                          on alphVar.LanguageId equals lang.Id
                 join
                     alphFam in this._alphabetFamilies
                          on alphVar.AlphabetFamilyId equals alphFam.Id
                 select
                     new AlphabetVariantOption(
                         alphVar.Id,
                         lang.NativeName,
                         alphFam.InvariantCultureName,
                         new Dictionary<char, CharMetadata>(
                             alphVar.AlphabetVariantCharsUtf16s.Select(x =>
                                new KeyValuePair<char, CharMetadata>(
                                    x.Char.First(),
                                    new CharMetadata(!x.IsCommon))))));
            var results = await query
                .ToArrayAsync(cancellationToken)
                .ConfigureAwait(false);
            return results;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public Task<IAlphabetVariantOption> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
        //var result = await
        //    (from
        //        alphVar in this._alphabetVariants
        //     join
        //         lang in this._languages
        //              on alphVar.LanguageId equals lang.Id
        //     select
        //         new AlphabetVariantOption(
        //             alphVar.Id,
        //             new LanguageOption(lang.Id, lang.NativeName),
        //             alphVar.AlphabetVariantCharsUtf16s.ToDictionary(x => (char)x.CharCode, x => new CharMetadata(x.IsCommon))))
        //    .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        //return result;
    }

    public Task<IReadOnlyList<IAlphabetVariantOption>> GetAllAsync(short languageId, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
