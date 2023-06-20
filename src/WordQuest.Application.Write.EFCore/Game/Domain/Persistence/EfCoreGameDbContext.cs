using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Data.Common;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public class EfCoreGameDbContext : DbContext
{
    //private readonly string _connectionString;
    //private readonly DbConnection _dbConnection;

    public EfCoreGameDbContext()
    {
        //this._dbConnection = dbConnection ?? throw new ArgumentNullException(nameof(dbConnection));
        //if (string.IsNullOrWhiteSpace(connectionString))
        //    throw new ArgumentException($"'{nameof(connectionString)}' cannot be null or whitespace.", nameof(connectionString));

        //this._connectionString = connectionString;
    }

    public EfCoreGameDbContext(DbContextOptions<EfCoreGameDbContext> options)
        : base(options)
    {
    }

    public DbSet<Language> Languages { get; set; }
    public DbSet<AlphabetVariant> AlphabetVariants { get; set; }
    public DbSet<Category> Categories { get; set; }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=WordQuest;Integrated Security=True;TrustServerCertificate=True;");
}
