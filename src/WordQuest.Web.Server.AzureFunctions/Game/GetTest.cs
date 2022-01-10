using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace WordQuest.Web.Service.Functions.MSAzure.Game;

public class GetTest
{
    public GetTest()
    {
    }

    [FunctionName(nameof(GetTest))]
    public async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
        //var x = CharsetsHelper.InfosOf(65, 90).ToImmutableDictionary();
        //x = CharsetsHelper
        //    .InfosOf(
        //        65, 90,
        //        exclusions: new[] { 'J', 'K', 'W', 'X', 'Y' }.ToHashSet(),
        //        uncommons: new[] { 'H', 'Q' }.ToHashSet())
        //    .ToImmutableDictionary();
        //x = CharsetsHelper.InfosOf(1040, 1071).ToImmutableDictionary();
        return new OkResult();
    }
}
