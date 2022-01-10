using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System;
using System.Net;
using System.Threading.Tasks;
using WordQuest.Game.Services;

namespace WordQuest.Game.Matches.Creation;

public class GetAlphabetOptions
{
    private readonly IMatchCreationService _cultureService;

    public GetAlphabetOptions(IMatchCreationService cultureService)
    {
        this._cultureService = cultureService ?? throw new ArgumentNullException(nameof(cultureService));
    }

    [FunctionName(nameof(GetAlphabetOptions))]
    public async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequest req)
    {
        var alphabets = await this._cultureService.GetAlphabetVariantsAsync();
        return new OkObjectResult(alphabets);
    }
}
