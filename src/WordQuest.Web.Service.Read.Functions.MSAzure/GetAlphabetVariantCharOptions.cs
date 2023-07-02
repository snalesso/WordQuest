using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;
using System.Web;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Matches.Creation;

public class GetAlphabetVariantCharOptions
{
    private readonly IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext> _unitOfWorkFactory;

    public GetAlphabetVariantCharOptions(
        IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext> unitOfWorkFactory)
    {
        this._unitOfWorkFactory = unitOfWorkFactory;
    }

    [Function(nameof(GetAlphabetVariantCharOptions))]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequestData req,
        CancellationToken cancellationToken = default)
    {
        var queryParams = HttpUtility.ParseQueryString(req.Url.Query);
        if (queryParams is null)
            return req.CreateResponse(HttpStatusCode.BadRequest);

        // TODO: evaluate Guid.TryParseExact
        // TODO: extract constants
        if (!queryParams.TryGetValue("alphabetVariantId", out var alphabetVariantIdStr) || !Guid.TryParse(alphabetVariantIdStr, out var alphabetVariantId))
            return req.CreateResponse(HttpStatusCode.BadRequest);

        var results = await this._unitOfWorkFactory
            .ExecuteAsync(async (ctx, ct) =>
            {
                var results = await ctx.AlphabetVariantCharOptions.GetAllAsync(alphabetVariantId, ct).ConfigureAwait(false);
                return results;
            }, cancellationToken)
            .ConfigureAwait(false);

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(results).ConfigureAwait(false);
        return response;
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
