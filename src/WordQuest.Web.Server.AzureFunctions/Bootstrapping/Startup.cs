using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using WordQuest.Culture.Domain.Persistence;
using WordQuest.Data.Mocks.Culture.Domain.Persistence;
using WordQuest.Data.Mocks.Game.Application.Services;
using WordQuest.Game.Services;

[assembly: FunctionsStartup(typeof(WordQuest.Bootstrapping.Startup))]

namespace WordQuest.Bootstrapping;

public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        //builder.Services.AddSingleton<IUnitOfWorkFactory<IGameUnitOfWork>>(provider => EFCoreMatchCreationService());
        builder.Services.AddSingleton<IMatchCreationService, EFCoreMatchCreationService>();

        builder.Services.AddSingleton<IAlphabetsRepository>(provider => new InMemoryAlphabetsRepository());
        builder.Services.AddSingleton<ILanguagesRepository>(provider => new InMemoryLanguagesRepository());
        builder.Services.AddSingleton<IMatchCreationService, InMemoryMatchConfigService>();
        //builder.Services.AddSingleton<IMatchCreationService>(
        //    provider => new InMemoryMatchConfigService(
        //        provider.GetService<ILanguagesRepository>(),
        //        provider.GetService<IAlphabetsRepository>()));

        //builder.Services.AddSingleton<IAlphabetsRepository>().AddSingleton<InMemoryAlphabetsRepository>();
        //builder.Services.AddSingleton<ILanguagesRepository>().AddSingleton<InMemoryLanguagesRepository>();
        //builder.Services.AddSingleton<IMatchCreationService>().AddSingleton<InMemoryMatchConfigService>();
    }
}
