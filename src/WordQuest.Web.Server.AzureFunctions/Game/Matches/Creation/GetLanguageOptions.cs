using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WordQuest.Culture.DTOs;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Persistence;

namespace WordQuest.Game.Matches.Creation;

public class GetLanguageOptions
{
    private readonly IUnitOfWorkFactory<IGameUnitOfWork> _uowFactory;

    public GetLanguageOptions(IUnitOfWorkFactory<IGameUnitOfWork> uowFactory)
    {
        this._uowFactory = uowFactory ?? throw new System.ArgumentNullException(nameof(uowFactory));
    }

    [FunctionName(nameof(GetLanguageOptions))]
    public async Task<IEnumerable<LanguageOption>> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequest req)
    {
        await using var uow = await this._uowFactory.CreateAsync();
        var items = await uow.Languages.GetAllAsync();
        var dots = items.Select(x => new LanguageOption(x.Id, x.NativeName));

        return dots;
    }

    //[FunctionName(nameof(GetLanguages))]
    //public static IActionResult Run(
    //    [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequest req,
    //    ILogger log)
    //{
    //    var langsDict = new Dictionary<LCID, Culture.Application.DTOs.Language>
    //    {
    //        [LCID.Italian] = new Culture.Application.DTOs.Language() { NativeName = "Italiano" },
    //        [LCID.English] = new Culture.Application.DTOs.Language() { NativeName = "English" },
    //        [LCID.German] = new Culture.Application.DTOs.Language() { NativeName = "Deutsch" },
    //        [LCID.French] = new Culture.Application.DTOs.Language() { NativeName = "Français" },
    //        [LCID.Russian] = new Culture.Application.DTOs.Language() { NativeName = "Русский" },
    //        [LCID.Spanish] = new Culture.Application.DTOs.Language() { NativeName = "Español" }
    //    };

    //    var languages = langsDict.Select(x => x.Value);

    //    return new OkObjectResult(languages);
    //}
}
