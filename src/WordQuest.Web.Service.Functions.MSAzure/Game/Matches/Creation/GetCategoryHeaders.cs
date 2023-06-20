using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Web;
using WordQuest.Game.Domain;
using WordQuest.Game.Services;

namespace WordQuest.Game.Matches.Creation;

public class GetCategoryHeaders
{
    private readonly IMatchCreationService _matchCreationService;

    public GetCategoryHeaders(IMatchCreationService matchCreationService)
    {
        this._matchCreationService = matchCreationService ?? throw new System.ArgumentNullException(nameof(matchCreationService));
    }

    [Function(nameof(GetCategoryHeaders))]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequestData req,
        ILogger logger)
    {
        var queryParams = HttpUtility.ParseQueryString(req.Url.Query);
        if (queryParams is null)
            return req.CreateResponse(HttpStatusCode.BadRequest);

        //if (!queryParams.TryGetValue("languageId", out var languageIdStr) || !int.TryParse(languageIdStr, out var languageId))
        //    return new StatusCodeResult(StatusCodes.Status400BadRequest);

        // TODO: evaluate GUid.TryParseExact
        if (!queryParams.TryGetValue("alphabetId", out var alphabetIdStr) || !Guid.TryParse(alphabetIdStr, out var alphabetId))
            return req.CreateResponse(HttpStatusCode.BadRequest);

        var categories = await this._matchCreationService.GetRandomCategories(alphabetId, 8);
        var categoryHeaders = categories
            .Select((category, index) =>
                new CategoryOption(
                    category.Id,
                    category.Name,
                    $"Category \"{category.Name}\" for alphabet #{alphabetId}."));

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(categoryHeaders);
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
