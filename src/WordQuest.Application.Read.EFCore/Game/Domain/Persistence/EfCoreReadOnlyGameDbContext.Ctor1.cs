using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreReadOnlyGameDbContext : DbContext
{
    private readonly DbConnection _dbConnection;

    public EfCoreReadOnlyGameDbContext(DbConnection dbConnection)
    {
        this._dbConnection = dbConnection ?? throw new ArgumentNullException(nameof(dbConnection));
    }
}