using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WordQuest.Game.Services;
using WordQuest.Game.DTOs;

namespace WordQuest.Game.Matches.Creation;

public class GetCategories
{
    private readonly IMatchCreationService _matchCreationService;

    public GetCategories(IMatchCreationService matchCreationService)
    {
        this._matchCreationService = matchCreationService ?? throw new System.ArgumentNullException(nameof(matchCreationService));
    }

    [FunctionName(nameof(GetCategories))]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequest req,
        ILogger log)
    {
        var queryParams = req.Query;
        if (queryParams is null)
            return new StatusCodeResult(StatusCodes.Status400BadRequest);

        if (!queryParams.TryGetValue("languageId", out var languageIdStr) || !int.TryParse(languageIdStr, out var languageId))
            return new StatusCodeResult(StatusCodes.Status400BadRequest);

        if (!queryParams.TryGetValue("alphabetId", out var alphabetIdStr) || !int.TryParse(alphabetIdStr, out var alphabetId))
            return new StatusCodeResult(StatusCodes.Status400BadRequest);

        var categories = await this._matchCreationService.GetRandomCategories(alphabetId, 8);
        var categoryHeaders = categories.Select((category, index) => new CategoryHeader(index, category.Name)
        {
            //AlphabetId = alphabetId,
            //LanguageId = languageId,
            //Id = index, // + (alphabetId * 100) + (languageId * 1000),
            //Name = categoryName,
            Description = $"Category \"{category.Name}\" of language #{languageId} for alphabet #{alphabetId}."
        });

        return new OkObjectResult(categoryHeaders);
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
