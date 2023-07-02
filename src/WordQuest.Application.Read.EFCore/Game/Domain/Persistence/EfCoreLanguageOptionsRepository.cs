using Microsoft.EntityFrameworkCore;
using WordQuest.Game.Domain.Dtos;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Persistence;

internal class EfCoreLanguageOptionsRepository : ILanguageOptionsView
{
    private readonly DbSet<LanguageOption> _languageOptions;

    public EfCoreLanguageOptionsRepository(DbSet<LanguageOption> languages)
    {
        this._languageOptions = languages ?? throw new ArgumentNullException(nameof(languages));
    }

    public async Task<IReadOnlyList<LanguageOption>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await this._languageOptions.ToListAsync(cancellationToken);
    }

    public async Task<LanguageOption> GetAsync(int id, CancellationToken cancellationToken = default)
    {
        return await this._languageOptions.FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
    }
}
