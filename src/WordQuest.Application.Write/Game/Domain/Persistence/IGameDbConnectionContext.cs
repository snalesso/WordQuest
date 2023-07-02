using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface IGameDbConnectionContext
{
    ILanguagesRepository Languages { get; }
    IAlphabetVariantsRepository AlphabetVariants { get; }
    ICategoriesRepository Categories { get; }

    #region views

    #endregion
}
