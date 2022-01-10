using System.Data;
using System.Threading.Tasks;

namespace WordQuest.Domain.Persistence;

public interface IConnectionFactory<TConnection>
    where TConnection : IDbConnection
{
    Task<TConnection> CreateAsync();
}
