using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;
using WordQuest.Game.Domain;
using WordQuest.Game.Services;

namespace WordQuest.Game.Matches.Creation;

public class GetLanguageOptions
{
    private readonly IMatchCreationService _matchCreationService;

    public GetLanguageOptions(IMatchCreationService matchCreationService)
    {
        this._matchCreationService = matchCreationService ?? throw new ArgumentNullException(nameof(matchCreationService));
    }

    [Function(nameof(GetLanguageOptions))]
    public Task<IReadOnlyList<LanguageOption>> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequestData req)
    {
        return this._matchCreationService.GetLanguageOptionsAsync();
    }

    //[FunctionName(nameof(GetLanguages))]
    //public static IActionResult Run(
    //    [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequest req,
    //    ILogger log)
    //{
    //    var langsDict = new Dictionary<LCID, Culture.Application.DTOs.Language>
    //    {
    //        [LCID.Italian] = new Culture.Application.DTOs.Language() { NativeName = "Italiano" },
    //        [LCID.English] = new Culture.Application.DTOs.Language() { NativeName = "English" },
    //        [LCID.German] = new Culture.Application.DTOs.Language() { NativeName = "Deutsch" },
    //        [LCID.French] = new Culture.Application.DTOs.Language() { NativeName = "Français" },
    //        [LCID.Russian] = new Culture.Application.DTOs.Language() { NativeName = "Русский" },
    //        [LCID.Spanish] = new Culture.Application.DTOs.Language() { NativeName = "Español" }
    //    };

    //    var languages = langsDict.Select(x => x.Value);

    //    return new OkObjectResult(languages);
    //}
}
