using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WordQuest.Culture.Application.DTOs;
using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Web.Functions._Azure
{
    public static class GetLanguages
    {
        [FunctionName(nameof(GetLanguages))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequest req,
            ILogger log)
        {
            var langsDict = new Dictionary<LCID, LanguageDto>
            {
                [LCID.Italian] = new LanguageDto() { NativeName = "Italiano" },
                [LCID.English] = new LanguageDto() { NativeName = "English" },
                [LCID.German] = new LanguageDto() { NativeName = "Deutsch" },
                [LCID.French] = new LanguageDto() { NativeName = "Français" },
                [LCID.Russian] = new LanguageDto() { NativeName = "Русский" },
                [LCID.Spanish] = new LanguageDto() { NativeName = "Español" }
            };

            var languages = langsDict.Select(x => x.Value);

            return new OkObjectResult(languages);
        }
    }
}