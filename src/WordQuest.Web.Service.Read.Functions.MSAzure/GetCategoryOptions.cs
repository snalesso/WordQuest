using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;
using System.Web;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Matches.Creation;

public class GetCategoryOptions
{
    private readonly IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext> _unitOfWorkFactory;

    public GetCategoryOptions(
        IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext> readOnlyUnitOfWorkFactory)
    {
        this._unitOfWorkFactory = readOnlyUnitOfWorkFactory;
    }

    [Function(nameof(GetCategoryOptions))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequestData req,
        CancellationToken cancellationToken = default)
    {
        var queryParams = HttpUtility.ParseQueryString(req.Url.Query);
        if (queryParams is null)
            return req.CreateResponse(HttpStatusCode.BadRequest);

        //if (!queryParams.TryGetValue("languageId", out var languageIdStr) || !int.TryParse(languageIdStr, out var languageId))
        //    return new StatusCodeResult(StatusCodes.Status400BadRequest);

        // TODO: evaluate Guid.TryParseExact
        // TODO: extract constants
        if (!queryParams.TryGetValue("alphabetVariantId", out var alphabetIdStr) || !Guid.TryParse(alphabetIdStr, out var alphabetVariantId))
            return req.CreateResponse(HttpStatusCode.BadRequest);

        var results = await this._unitOfWorkFactory
            .ExecuteAsync(async (ctx, ct) =>
            {
                var results = await ctx.CategoryOptions.GetAllAsync(alphabetVariantId, ct).ConfigureAwait(false);
                return results;
            }, cancellationToken)
            .ConfigureAwait(false);

        //var categoryHeaders = categories
        //    .Select((category, index) =>
        //        new CategoryOption(
        //            category.Id,
        //            category.Name,
        //            $"Category \"{category.Name}\" for alphabet #{alphabetId}."));

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(results).ConfigureAwait(false);
        return response;
    }

    //private async Task<IEnumerable<CategoryHeader>> GetFakeCategoryBodyDtos(
    //    int languageId,
    //    int alphabetId,
    //    //, AlphabetFamily alphabetFamily
    //    CancellationToken cancellationToken = default
    //    )
    //{
    //    //return categoryNames
    //    //    .Select((categoryName, index) => new CategoryBodyDto(
    //    //        /*Id =*/ (languageId * 10) /*+ ((int)alphabetFamily))*/ * 100 + index,
    //    //        //LanguageId = languageId,
    //    //        //AlphabetFamily = alphabetFamily,
    //    //        /*Name =*/ categoryName,
    //    //        /*Description =*/  $"Description for \"{categoryName}\" of language #{languageId} ..."
    //    //    ));
    //}
}
