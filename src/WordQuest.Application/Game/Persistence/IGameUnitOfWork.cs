using WordQuest.Domain.Persistence;
using WordQuest.Culture.Domain.Persistence;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Persistence
{
    public interface IGameUnitOfWork : IUnitOfWork
    {
        ILanguagesRepository Languages { get; }
        IAlphabetsRepository Alphabets { get; }
        ICategoriesRepository Categories { get; }
    }
}
