using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using WordQuest.Web.DTOs;

namespace WordQuest.Web.Functions.MSAzure.Functions.v2
{
    public static class GetCategories
    {
        [FunctionName(nameof(GetCategories))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req
            //, [FromQuery] int languageId
            //AlphabetFamily alphabetFamily
            //ILogger logger
            )
        {
            int languageId;
            if (!req.Query.TryGetValue(nameof(languageId), out var languageIdQueryArg) || !int.TryParse(languageIdQueryArg, out languageId))
                return new BadRequestObjectResult(new ArgumentException(null, nameof(languageId)));

            int alphabetId;
            if (!req.Query.TryGetValue(nameof(alphabetId), out var alphabetIdQueryArg) || !int.TryParse(alphabetIdQueryArg, out alphabetId))
                return new BadRequestObjectResult(new ArgumentException(null, nameof(alphabetId)));

            //AlphabetFamily alphabetFamily;
            //if (!req.Query.TryGetValue(nameof(alphabetFamily), out var alphabetFamilyQueryArg)
            //    || !Enum.TryParse(alphabetFamilyQueryArg, out alphabetFamily))
            //{
            //    return new BadRequestObjectResult(new ArgumentException(null, nameof(alphabetFamily)));
            //}

            return new OkObjectResult(GetFakeCategoryBodyDtos(languageId, alphabetId/*, alphabetFamily*/).ToDictionary(x => x.Id, x => x));
        }

        private static IEnumerable<CategoryHeaderDto> GetFakeCategoryBodyDtos(
            int languageId,
            int alphabetId
            //, AlphabetFamily alphabetFamily
            )
        {
            var categoryNames = new[] {
                "cities",
                "animals",
                "person names",
                "elements and compounds",
                "mithology",
                "hobbies",
                "adjectives",
                "plants, flowers & fruits",
                "war weapons",
                "Pokémon",
                "Pokémon spells",
                "League of Legends' champions",
                "fat people's hobbies",
                "diseases",
                "alcoholics",
                "strange person names",
                "capitals",
                "rivers & lakes",
                "mountains & ranges",
                "world's capitals",
                "nigga stuff",
                "sex quotes",
                "ways to die in Africa",
                "soccer players",
                "movies",
                "books",
                "songs",
                "languages",
                "countries",
                "actors & actresses"
            };

            //return categoryNames
            //    .Select((categoryName, index) => new CategoryBodyDto(
            //        /*Id =*/ (languageId * 10) /*+ ((int)alphabetFamily))*/ * 100 + index,
            //        //LanguageId = languageId,
            //        //AlphabetFamily = alphabetFamily,
            //        /*Name =*/ categoryName,
            //        /*Description =*/  $"Description for \"{categoryName}\" of language #{languageId} ..."
            //    ));

            return categoryNames
                .Select((categoryName, index) => new CategoryHeaderDto()
                {
                    //AlphabetId = alphabetId,
                    //LanguageId = languageId,
                    Id = index, // + (alphabetId * 100) + (languageId * 1000),
                    Name = categoryName,
                    Description = $"Description for \"{categoryName}\" of language #{languageId} ..."
                });
        }
    }
}