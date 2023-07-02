using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Matches.Creation;

public class GetSystemInfo
{
    public GetSystemInfo() { }

    [Function(nameof(GetSystemInfo))]
    public async Task<HttpResponseData> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequestData req,
        CancellationToken cancellationToken = default)
    {
        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(DateTime.Now).ConfigureAwait(false);
        return response;
    }
}
