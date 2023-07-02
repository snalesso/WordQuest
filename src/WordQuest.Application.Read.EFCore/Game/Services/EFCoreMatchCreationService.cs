using WordQuest.Domain.Writing.Persistence;
using WordQuest.Game.Domain.Models;

namespace WordQuest.Game.Services;

public class EFCoreMatchCreationService : IMatchCreationService
{
    //private readonly IUnitOfWorkFactory<EFCoreGameUnitOfWork> _gameUnitOfWorkFactory;

    public EFCoreMatchCreationService(
        //IUnitOfWorkFactory<EFCoreGameUnitOfWork> createGameUnitOfWorkAsync
        )
    {
        //this._gameUnitOfWorkFactory = createGameUnitOfWorkAsync ?? throw new ArgumentNullException(nameof(createGameUnitOfWorkAsync));
    }

    public Task<IReadOnlyList<LanguageOption>> GetLanguageOptionsAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public async Task<IReadOnlyList<AlphabetVariantOption>> GetAlphabetVariantOptionsAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
        //await using (var uow = await this._gameUnitOfWorkFactory.CreateAsync(cancellationToken))
        //{
        //    var x = await uow.AlphabetVariants.
        //}
    }

    public Task<IReadOnlyList<CategoryOption>> GetRandomCategories(int alphabetVariantId, ushort count, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
