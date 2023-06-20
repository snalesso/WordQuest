using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WordQuest.Bootstrapping;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain.Persistence;
using WordQuest.Game.Services;

[assembly: FunctionsStartup(typeof(Startup))]

namespace WordQuest.Bootstrapping;

public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        var gameDbConnectionString = builder
              .GetContext()
              .Configuration
              .GetConnectionString(ConnectionStrings.Game);
        builder
            .Services
            .AddDbContext<EfCoreGameDbContext>(options => options.UseSqlServer(gameDbConnectionString));

        //RegisterInMemoryServices(builder);
        RegisterGameComponents(builder);

        //builder.Services.AddSingleton<IUnitOfWorkFactory<IGameUnitOfWork>>(provider => EFCoreMatchCreationService());
        //builder.Services.AddSingleton<IMatchCreationService, EFCoreMatchCreationService>();

        //builder.Services.AddSingleton<IAlphabetsRepository>(provider => new InMemoryAlphabetsRepository());
        //builder.Services.AddSingleton<ILanguagesRepository>(provider => new InMemoryLanguagesRepository());
        //builder.Services.AddSingleton<IMatchCreationService, InMemoryMatchConfigService>();
        //builder.Services.AddSingleton<IMatchCreationService>(
        //    provider => new InMemoryMatchConfigService(
        //        provider.GetService<ILanguagesRepository>(),
        //        provider.GetService<IAlphabetsRepository>()));

        //builder.Services.AddSingleton<IAlphabetsRepository>().AddSingleton<InMemoryAlphabetsRepository>();
        //builder.Services.AddSingleton<ILanguagesRepository>().AddSingleton<InMemoryLanguagesRepository>();
        //builder.Services.AddSingleton<IMatchCreationService>().AddSingleton<InMemoryMatchConfigService>();
    }

    #region game

    //private static void RegisterPersistence(IFunctionsHostBuilder builder)
    //{
    //    builder.Services.AddSingleton<InMemoryLanguageOptionsView>();
    //    builder.Services.AddSingleton<InMemoryAlphabetVariantOptionsView>();
    //    builder.Services.AddSingleton<InMemoryCategoryOptionsView>();
    //    builder.Services.AddSingleton<InMemoryGameUnitOfWork>();
    //    builder.Services.AddSingleton<IMatchCreationService, InMemoryMatchCreationService>();
    //    builder.Services.AddSingleton<IReadOnlyUnitOfWorkFactory<IReadOnlyGameConnectionContext>, InMemoryGameUnitOfWorkFactory>();
    //}

    //private static void RegisterApplication(IFunctionsHostBuilder builder)
    //{
    //    builder.Services.AddSingleton<InMemoryLanguageOptionsView>();
    //    builder.Services.AddSingleton<InMemoryAlphabetVariantOptionsView>();
    //    builder.Services.AddSingleton<InMemoryCategoryOptionsView>();
    //    builder.Services.AddSingleton<InMemoryGameUnitOfWork>();
    //    builder.Services.AddSingleton<IMatchCreationService, InMemoryMatchCreationService>();
    //    builder.Services.AddSingleton<IReadOnlyUnitOfWorkFactory<IReadOnlyGameConnectionContext>, InMemoryGameUnitOfWorkFactory>();
    //}

    //private static void RegisterInMemoryServices(IFunctionsHostBuilder builder)
    //{
    //    builder.Services.AddSingleton<InMemoryLanguageOptionsView>();
    //    builder.Services.AddSingleton<InMemoryAlphabetVariantOptionsView>();
    //    builder.Services.AddSingleton<InMemoryCategoryOptionsView>();
    //    builder.Services.AddSingleton<InMemoryGameUnitOfWork>();
    //    builder.Services.AddSingleton<IMatchCreationService, InMemoryMatchCreationService>();
    //    builder.Services.AddSingleton<IReadOnlyUnitOfWorkFactory<IReadOnlyGameConnectionContext>, InMemoryGameUnitOfWorkFactory>();
    //}

    #endregion

    #region READ-ONLY

    private static void RegisterGameComponents(IFunctionsHostBuilder builder)
    {
        //builder.Services.AddSingleton<EfCoreReadOnlyGameConnectionContext>();
        //builder.Services.AddSingleton<EfCoreLanguageOptionsView>();
        //builder.Services.AddSingleton<EfCoreAlphabetVariantOptionsView>();
        //builder.Services.AddSingleton<EfCoreCategoryOptionsView>();
        //builder.Services.AddSingleton<IMatchCreationService, MatchCreationService>();
        //builder.Services.AddSingleton<IReadOnlyUnitOfWorkFactory<IReadOnlyGameConnectionContext>, EfCoreReadOnlyGameUnitOfWorkFactory>();
    }

    #endregion

    #region READ-WRITE

    #endregion
}
