using System.Data;
using System.Threading.Tasks;

namespace WordQuest.Common.Persistence
{
    public interface IConnectionFactory<TConnection>
        where TConnection : IDbConnection
    {
        Task<TConnection> CreateAsync();
        TConnection Create();
    }
}
