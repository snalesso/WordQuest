using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using WordQuest.Culture.Domain;
using WordQuest.Web.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace WordQuest.Web.Functions.MSAzure.Functions.v2
{
    public static class GetLanguages
    {
        [FunctionName(nameof(GetLanguages))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger logger)
        {
            //var r = new Random();
            //if (r.Next(0, 2) == 1)
            //    return new UnauthorizedResult();

            var langs = new Dictionary<int, LanguageDto>
            {
                [(int)LCID.Italian] = new LanguageDto() { NativeName = "Italiano" },
                [(int)LCID.English] = new LanguageDto() { NativeName = "English" },
                [(int)LCID.German] = new LanguageDto() { NativeName = "Deutsch" },
                [(int)LCID.French] = new LanguageDto() { NativeName = "Français" },
                [(int)LCID.Russian] = new LanguageDto() { NativeName = "Русский" },
                [(int)LCID.Spanish] = new LanguageDto() { NativeName = "Español" }
            };
            //new LanguageDto(1, "Italiano"),
            //new LanguageDto(2, "English"),
            //new LanguageDto(3, "Español"),
            //new LanguageDto(4, "Français"),
            //new LanguageDto(5, "Deutsch"),
            //new LanguageDto(6, "Русский")

            return new OkObjectResult(langs);
        }
    }
}