using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Text.Json;
using System.Text.Json.Serialization;
using WordQuest.Bootstrapping;
using WordQuest.Game.Composition;

/*
 * Docs:https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide
 * Ready To Run: https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide#readytorun
 * Middleware: https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide#middleware
 */

//var connectionStrings = Environment.GetEnvironmentVariable("ConnectionStrings");
//var gameDbConnectionString = Environment.GetEnvironmentVariable(ConnectionStringKeys.Game);

var builder = new HostBuilder();
var host = builder
    /* https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide#configuration */
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureAppConfiguration((context, configuration) =>
    {
        var configRoot = configuration
#if DEBUG
            .AddJsonFile("local.settings.json", optional: false, reloadOnChange: true)
#endif
            .Build();
        //configuration.AddConfiguration();
        //var gameDbConnectionString = configRoot.GetConnectionString(ConnectionStringKeys.Game);
    })
    /* https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-process-guide#dependency-injection */
    .ConfigureServices((context, services) =>
    {
        var x = context.Configuration.GetConnectionString(ConnectionStringKeys.Game);
        services
            .Configure<JsonSerializerOptions>(options =>
            {
                options.AllowTrailingCommas = true;
                options.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                options.PropertyNameCaseInsensitive = true;
            })
            .RegisterEfCoreReadGameModule(context);
    })
    .Build();

await host.RunAsync();
