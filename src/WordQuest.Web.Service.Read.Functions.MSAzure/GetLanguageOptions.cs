using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using System.Net;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Matches.Creation;

public class GetLanguageOptions
{
    private readonly IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext> _unitOfWorkFactory;

    public GetLanguageOptions(
        IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext> unitOfWorkFactory)
    {
        this._unitOfWorkFactory = unitOfWorkFactory ?? throw new ArgumentNullException(nameof(unitOfWorkFactory));
    }

    [Function(nameof(GetLanguageOptions))]
    public async Task<IReadOnlyList<ILanguageOption>> RunAsync(
        [HttpTrigger(AuthorizationLevel.Anonymous, WebRequestMethods.Http.Get)] HttpRequestData req,
        CancellationToken cancellationToken = default)
    {
        var results = await this._unitOfWorkFactory
            .ExecuteAsync(async (ctx, ct) =>
            {
                var results = await ctx.LanguageOptions.GetAllAsync(ct).ConfigureAwait(false);
                return results;
            }, cancellationToken)
            .ConfigureAwait(false);
        return results;
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
