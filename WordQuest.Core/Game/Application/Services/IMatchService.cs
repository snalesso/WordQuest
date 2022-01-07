using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace WordQuest.Game.Application.Services
{
    public interface IMatchService
    {
        Task<int> CreateAsync(CancellationToken cancellationToken = default);
    }
}
