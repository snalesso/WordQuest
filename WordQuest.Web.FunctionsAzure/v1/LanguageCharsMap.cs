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
    public static class LanguageCharsMap
    {
        [FunctionName(nameof(LanguageCharsMap))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger logger)
        {
            //var r = new Random();
            //if (r.Next(0, 2) == 1)
            //    return new UnauthorizedResult();

            var matchLanguages = new[]
            {
                new
                {
                    Language = LCID.English,
                    NativeName = "English",
                    CharConfigs = BuildCharInfos('A', 'Z')
                        .Select(kvp=> new CharInfoDto{ Char=kvp.Key, IsRare=kvp.Value})
                        .ToDictionary(x=>x.Char, x=>x)
                },
                new
                {
                    Language = LCID.Italian,
                    NativeName = "Italiano",
                    CharConfigs = BuildCharInfos(
                                    'A', 'Z',
                                    exclusions: new[] { 'J', 'K', 'W', 'X', 'Y' }.ToHashSet(),
                                    uncommons: new[] { 'H', 'Q' }.ToHashSet())
                        .Select(kvp=> new CharInfoDto{ Char=kvp.Key, IsRare=kvp.Value})
                        .ToDictionary(x=>x.Char, x=>x)
                },
                new
                {
                    Language = LCID.Russian,
                    NativeName = "Русский",
                    CharConfigs = BuildCharInfos(1040, 1071)
                        .Select(kvp=> new CharInfoDto{ Char=kvp.Key, IsRare=kvp.Value})
                        .ToDictionary(x=>x.Char, x=>x)
                }
            };

            return new OkObjectResult(matchLanguages
                .ToDictionary(x => (int)x.Language, x => x)
                //.ToList()
                );
        }

        private static IDictionary<char, bool> BuildCharInfos(int first, int last, ISet<char> exclusions = null, ISet<char> uncommons = null)
        {
            var chars = Enumerable
                .Range(first, last - first)
                .Select(x => Convert.ToChar(x));

            if (exclusions != null)
            {
                chars = chars.Where(x => !exclusions.Contains(x));
            }

            if (uncommons == null)
            {
                return chars.ToDictionary(x => x, _ => true);
            }

            return chars.ToDictionary(x => x, x => !uncommons.Contains(x));
        }
        private static IDictionary<char, bool> BuildCharInfos(char first, char last, ISet<char> exclusions = null, ISet<char> uncommons = null)
        {
            return BuildCharInfos((int)first, (int)last, exclusions, uncommons);
        }
    }
}