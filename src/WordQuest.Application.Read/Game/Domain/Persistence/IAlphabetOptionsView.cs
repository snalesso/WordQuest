using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface IAlphabetOptionsView : IView<AlphabetOption>
{
    Task<AlphabetOption> GetAsync();
}
