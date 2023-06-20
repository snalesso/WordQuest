using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using WordQuest.Game.Services;

namespace WordQuest.Game.Matches.Creation;

public class GetAlphabetVariantOptions
{
    private readonly IMatchCreationService _cultureService;

    public GetAlphabetVariantOptions(IMatchCreationService cultureService)
    {
        this._cultureService = cultureService ?? throw new ArgumentNullException(nameof(cultureService));
    }

    [Function(nameof(GetAlphabetVariantOptions))]
    public async Task<IReadOnlyList<AlphabetVariantOption>> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequestData req)
    {
        var result = await this._cultureService.GetAlphabetVariantOptionsAsync();
        return result;
    }
}
