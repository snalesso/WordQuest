using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using WordQuest.Web.Data;
using WordQuest.Web.DTOs;

namespace WordQuest.Web.Functions.MSAzure.Functions.v2
{
    public static class GetAlphabets
    {
        [FunctionName(nameof(GetAlphabets))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger logger)
        {
            // ToDictionary(x => x.Key, x => new CharInfoDto { Char = x.Value.Char, IsRare = x.Value.IsUncommon })
            var langs = FakeApi.GetLanguages();
            var langChars = FakeApi.GetLanguageCharInfos();

            var alphabets =
                from l in langs
                join lc in langChars
                    on l.Key equals lc.Key
                select new AlphabetDto
                {
                    Id = (int)Math.Ceiling((int)l.Value.LCID / 2d),
                    NativeName = l.Value.NativeName + "Alph",
                    CharInfos = lc.Value.ToDictionary(
                        x => x.Key,
                        x => new CharInfoDto
                        {
                            Char = x.Value.Char,
                            IsRare = x.Value.IsUncommon
                        }),
                    Language = new LanguageDto
                    {
                        Id = (int)l.Value.LCID,
                        NativeName = l.Value.NativeName
                    }
                };

            int i = 1;
            var alphDict = alphabets.ToDictionary(x => i++, x => x);

            return new OkObjectResult(alphDict);
        }
    }
}