using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using System.Net;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Matches.Creation;

public class GetAlphabetVariantOptions
{
    private readonly IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext> _unitOfWorkFactory;

    public GetAlphabetVariantOptions(
        IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext> unitOfWorkFactory)
    {
        this._unitOfWorkFactory = unitOfWorkFactory;
    }

    [Function(nameof(GetAlphabetVariantOptions))]
    public async Task<IReadOnlyList<IAlphabetVariantOption>> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequestData req,
        CancellationToken cancellationToken = default)
    {
        var results = await this._unitOfWorkFactory
            .ExecuteAsync(async (ctx, ct) =>
            {
                var results = await ctx.AlphabetVariantOptions.GetAllAsync(ct).ConfigureAwait(false);
                return results;
            }, cancellationToken)
            .ConfigureAwait(false);
        return results;
    }

    //private readonly EfCoreReadOnlyGameDbContext _gameDbContext;
    //public GetAlphabetVariantOptions(EfCoreReadOnlyGameDbContext gameDbContext)
    //{
    //    this._gameDbContext = gameDbContext;
    //}

    //[Function(nameof(GetAlphabetVariantOptions))]
    //public async Task<IReadOnlyList<IAlphabetVariantOption>> RunAsync(
    //    [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequestData req,
    //    CancellationToken cancellationToken = default)
    //{
    //    var x = await _gameDbContext.LanguageAlphabets.FirstOrDefaultAsync(cancellationToken);
    //    throw new NotImplementedException();
    //}
}
