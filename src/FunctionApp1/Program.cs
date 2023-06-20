using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json.Serialization;
using System.Text.Json;
using WordQuest.Bootstrapping;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain.Persistence;
using WordQuest.Game.Services;

static IServiceCollection RegisterGameComponents(IServiceCollection services)
{
    services.AddScoped<IMatchCreationService, MatchCreationService>();
    return services;
}

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    //.ConfigureAppConfiguration(configuration =>
    //{
    //    configuration.Build().GetConnectionString(ConnectionStrings.Game);
    //})
    .ConfigureServices(services =>
    {
        services.Configure<JsonSerializerOptions>(options =>
        {
            options.AllowTrailingCommas = true;
            options.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.PropertyNameCaseInsensitive = true;
        });
        services = RegisterGameComponents(services);
    })
    .Build();

host.Run();
