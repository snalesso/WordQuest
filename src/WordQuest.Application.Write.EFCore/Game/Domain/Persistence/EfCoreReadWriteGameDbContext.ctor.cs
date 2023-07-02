using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreReadWriteGameDbContext : DbContext
{
    private readonly DbConnection _dbConnection;

    public EfCoreReadWriteGameDbContext(DbConnection dbConnection)
    {
        this._dbConnection = dbConnection ?? throw new ArgumentNullException(nameof(dbConnection));
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite(this._dbConnection);
    }
}
