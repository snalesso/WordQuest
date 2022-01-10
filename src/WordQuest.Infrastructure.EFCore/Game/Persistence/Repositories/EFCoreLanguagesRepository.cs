using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WordQuest.Culture.Domain.Entities;
using WordQuest.Culture.Domain.Persistence;

namespace WordQuest.Game.Persistence.Repositories
{
    internal class EFCoreLanguagesRepository : ILanguagesRepository
    {
        private readonly WordQuestDBContext _dbContext;

        public EFCoreLanguagesRepository()
        {

        }

        public Task<IEnumerable<Language>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<Language> GetAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
