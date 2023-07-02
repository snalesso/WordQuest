using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Composition;

public static class IServiceCollectionExtensions
{
    public static IServiceCollection RegisterEfCoreReadGameModule(this IServiceCollection services, HostBuilderContext hostBuilderContext)
    {
        var gameDbConnectionString = hostBuilderContext.Configuration.GetConnectionString("Game");
        return services
            .AddDbContextFactory<EfCoreReadOnlyGameDbContext>(async (services, options) =>
            {
                options.UseSqlServer(gameDbConnectionString);
            }, ServiceLifetime.Scoped)
            //.AddSqlServer<EfCoreReadOnlyGameDbContext>(gameDbConnectionString, null, o =>
            //{
            //    o.UseSqlServer(gameDbConnectionString);
            //})
            //.AddDbContext<EfCoreReadOnlyGameDbContext>(o =>
            //{
            //    o.UseSqlServer(gameDbConnectionString);
            //})
            //.AddScoped<Func<CancellationToken, Task<EfCoreReadOnlyGameDbContext>>>(x =>
            //{
            //    return (CancellationToken cancellationToken) =>
            //    {
            //        var dbContext = x.GetService<EfCoreReadOnlyGameDbContext>();
            //        return Task.FromResult(dbContext);
            //    };
            //})
            .AddScoped<
                IReadOnlyUnitOfWorkFactory<IReadOnlyUnitOfWork<IReadOnlyGameDbConnectionContext>, IReadOnlyGameDbConnectionContext>
                , EfCoreReadOnlyGameUnitOfWorkFactory>();
    }
}
