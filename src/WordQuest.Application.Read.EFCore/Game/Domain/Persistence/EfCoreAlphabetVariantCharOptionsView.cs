using Microsoft.EntityFrameworkCore;

namespace WordQuest.Game.Domain.Persistence;

internal class EfCoreAlphabetVariantCharOptionsView : IAlphabetVariantCharOptionsView
{
    private readonly DbSet<EfCoreAlphabetVariant> _alphabetVariants;
    private readonly DbSet<EfCoreAlphabetVariantCharsUtf16> _alphabetVariantChars;

    public EfCoreAlphabetVariantCharOptionsView(
        DbSet<EfCoreAlphabetVariant> alphabetVariants,
        DbSet<EfCoreAlphabetVariantCharsUtf16> alphabetVariantChars)
    {
        this._alphabetVariants = alphabetVariants ?? throw new ArgumentNullException(nameof(alphabetVariants));
        this._alphabetVariantChars = alphabetVariantChars ?? throw new ArgumentNullException(nameof(alphabetVariantChars));
    }

    public async Task<IReadOnlyList<ICharOption>> GetAllAsync(Guid alphabetVariantId, CancellationToken cancellationToken = default)
    {
        try
        {
            var query =
                from alphVar in this._alphabetVariants
                join charInfo in this._alphabetVariantChars
                    on alphVar.Id equals charInfo.AlphabetVariantId
                select
                    new CharOption(
                        charInfo.Char.Single(),
                        new CharMetadata(!charInfo.IsCommon));
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
}
