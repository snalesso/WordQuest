using Microsoft.EntityFrameworkCore;
using WordQuest.Game.Domain;

namespace WordQuest.Game.Domain.Persistence;

public class EfCoreAlphabetVariantOptionsView : IAlphabetVariantOptionsView
{
    private readonly DbSet<AlphabetVariant> _alphabetVariants;
    private readonly DbSet<LanguageAlphabet> _languageAlphabets;
    private readonly DbSet<Language> _languages;

    public EfCoreAlphabetVariantOptionsView(
        DbSet<AlphabetVariant> alphabetVariants,
        DbSet<LanguageAlphabet> languageAlphabets,
        DbSet<Language> languages)
    {
        this._alphabetVariants = alphabetVariants ?? throw new ArgumentNullException(nameof(alphabetVariants));
        this._languageAlphabets = languageAlphabets ?? throw new ArgumentNullException(nameof(languageAlphabets));
        this._languages = languages ?? throw new ArgumentNullException(nameof(languages));
    }

    public async Task<IReadOnlyList<AlphabetVariantOption>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        //throw new NotImplementedException();
        try
        {
            var results = await
                (from
                    alphVar in this._alphabetVariants
                 join
                     lang in this._languages
                          on alphVar.LanguageId equals lang.Id
                 select
                     new AlphabetVariantOption(
                         alphVar.Id,
                         new Domain.LanguageOption(lang.Id, lang.NativeName),
                         new Dictionary<char, CharMetadata>(
                             alphVar.AlphabetVariantCharsUtf16s.Select(x => new KeyValuePair<char, CharMetadata>(x.Char.First(), new CharMetadata(x.IsCommon ?? true))))))
                .ToArrayAsync(cancellationToken);
            return results;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public Task<AlphabetVariantOption?> GetAsync(Guid id, CancellationToken cancellationToken = default)
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

    public Task<IReadOnlyList<AlphabetVariantOption>> GetAllAsync(short languageId, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
