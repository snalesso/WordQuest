using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using WordQuest.Culture.Domain.Persistence;
using WordQuest.Game.Application.Services;

[assembly: FunctionsStartup(typeof(WordQuest.Web.Service.Functions.MSAzure.Startup))]

namespace WordQuest.Web.Service.Functions.MSAzure
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddSingleton<IAlphabetsRepository>(s => new InMemoryAlphabetsRepository());
            builder.Services.AddSingleton<ILanguagesRepository>(s => new InMemoryLanguagesRepository());
            builder.Services.AddSingleton<IMatchCreationService>(
                s => new InMemoryMatchConfigService(
                    s.GetService<ILanguagesRepository>(),
                    s.GetService<IAlphabetsRepository>()));

            //builder.Services.AddSingleton<IAlphabetsRepository>().AddSingleton<InMemoryAlphabetsRepository>();
            //builder.Services.AddSingleton<ILanguagesRepository>().AddSingleton<InMemoryLanguagesRepository>();
            //builder.Services.AddSingleton<IMatchCreationService>().AddSingleton<InMemoryMatchConfigService>();
        }
    }
}