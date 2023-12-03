using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface ICategoriesRepository : IRepository<ICategory, Guid>
{
}
