using Microsoft.EntityFrameworkCore;
using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

internal sealed class EfCoreReadOnlyGameUnitOfWorkFactory
    : IReadOnlyUnitOfWorkFactory<EfCoreReadOnlyGameUnitOfWork, EfCoreReadOnlyGameDbConnectionContext>
    , IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext>
{
    private readonly IDbContextFactory<EfCoreReadOnlyGameDbContext> _dbContextFactory;

    public EfCoreReadOnlyGameUnitOfWorkFactory(IDbContextFactory<EfCoreReadOnlyGameDbContext> dbContextFactory)
    {
        this._dbContextFactory = dbContextFactory ?? throw new ArgumentNullException(nameof(dbContextFactory));
    }

    public async Task<EfCoreReadOnlyGameUnitOfWork> CreateAsync(CancellationToken cancellationToken = default)
    {
        if (this._dbContextFactory is null)
            throw new Exception("No connection factory."); try
        {
            var gameDbContext = await this._dbContextFactory.CreateDbContextAsync(cancellationToken).ConfigureAwait(false);
            //var x = await gameDbContext.AlphabetVariants.FirstOrDefaultAsync(cancellationToken);
            var gameUnitOfWork = new EfCoreReadOnlyGameUnitOfWork(gameDbContext);
            return gameUnitOfWork;
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    async Task<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>>
        IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext>
        .CreateAsync(CancellationToken cancellationToken)
    {
        return await CreateAsync(cancellationToken);
    }

    //private readonly Func<CancellationToken, Task<DbConnection>>? _gameDbConnectionFactoryFunc;

    //public EfCoreReadOnlyGameUnitOfWorkFactory(Func<CancellationToken, Task<DbConnection>> gameDbConnectionFactoryFunc)
    //{
    //    this._gameDbConnectionFactoryFunc = gameDbConnectionFactoryFunc;
    //}

    //public async Task<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>> CreateAsync(CancellationToken cancellationToken = default)
    //{
    //    if (this._gameDbConnectionFactoryFunc is null)
    //        throw new Exception("No connection factory.");
    //    var gameDbConnection = await this._gameDbConnectionFactoryFunc.Invoke(cancellationToken).ConfigureAwait(false);
    //    var gameUnitOfWork = new EfCoreReadOnlyGameUnitOfWork(gameDbConnection);
    //    return gameUnitOfWork;
    //}

    //private readonly Func<CancellationToken, Task<EfCoreReadOnlyGameDbContext>>? _gameDbContextFactoryFunc;
    //public EfCoreReadOnlyGameUnitOfWorkFactory(Func<CancellationToken, Task<EfCoreReadOnlyGameDbContext>> gameDbContextFactoryFunc)
    //{
    //    this._gameDbContextFactoryFunc = gameDbContextFactoryFunc;
    //}

    //public async Task<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>> CreateAsync(CancellationToken cancellationToken = default)
    //{
    //    if (this._gameDbContextFactoryFunc is null)
    //        throw new Exception("No db context factory.");
    //    var gameDbContext = await this._gameDbContextFactoryFunc.Invoke(cancellationToken).ConfigureAwait(false);
    //    var gameUnitOfWork = new EfCoreReadOnlyGameUnitOfWork(gameDbContext);
    //    return gameUnitOfWork;
    //}
}