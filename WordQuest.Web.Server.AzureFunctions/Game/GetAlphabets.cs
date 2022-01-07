using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using WordQuest.Game.Application.Services;

namespace WordQuest.Web.Functions.MSAzure
{
    public class GetAlphabets
    {
        private readonly IMatchCreationService _cultureService;

        public GetAlphabets(IMatchCreationService cultureService)
        {
            this._cultureService = cultureService ?? throw new ArgumentNullException(nameof(cultureService));
        }

        [FunctionName(nameof(GetAlphabets))]
        public async Task<IActionResult> RunAsync(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            var alphabets = await this._cultureService.GetAlphabetVariantsAsync();
            return new OkObjectResult(alphabets);
        }
    }
}