dotnet ef dbcontext scaffold "Data Source=.;Initial Catalog=WordQuest;Integrated Security=True;" Microsoft.EntityFrameworkCore.SqlServer --context NcbDbContext --context-dir Persistence/MSSqlServer --output-dir Persistence/MSSqlServer/Models --force