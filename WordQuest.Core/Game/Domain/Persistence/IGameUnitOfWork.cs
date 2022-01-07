using WordQuest.Common.Persistence;
using WordQuest.Culture.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence
{
    public interface IGameUnitOfWork : IUnitOfWork
    {
        ILanguagesRepository Languages { get; }
        IAlphabetsRepository Alphabets { get; }
        ICategoriesRepository Categories { get; }
    }
}
