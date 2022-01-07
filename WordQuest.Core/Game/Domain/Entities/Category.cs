using System.Collections.Generic;

namespace WordQuest.Game.Domain.Entities
{
    public class Category
    {
        public int Id { get; init; }
        public int LanguageId { get; init; }
        //public AlphabetFamily AlphabetFamily { get; set; }
        public string Name { get; init; }
        public string Description { get; init; }
        /// <summary>
        /// May reflect Tag enum value
        /// </summary>
        public IReadOnlySet<int> TagIds { get; init; }
        public bool IsCustom { get; init; }
    }

    // public interface IMatchRound {
    //     public category: ICategory;
    // }
    // public interface IMatchRoundPhase { }
    // public interface IWordsPhase extends IMatchRoundPhase { }
    // public interface IValidationPhase extends IMatchRoundPhase { }
}
