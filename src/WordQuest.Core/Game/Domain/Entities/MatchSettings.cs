using System;
using System.Collections.Generic;

namespace WordQuest.Game.Domain.Entities
{
    //public enum MatchAccessibility
    //{
    //    Public = 1,
    //    LinkOnly = 2
    //}

    public class MatchSettings
    {
        public int LanguageId { get; }
        public int AlphabetId { get; }
        public ushort SecondsPerWord { get; }
        public ushort RoundsCount { get; }
        public MatchMode Mode { get; }
        public bool IsPublic { get; }

        // TODO: this needs to track order & ensure uniqueness
        public IReadOnlySet<Category> Categories { get; }
        // TODO: this needs to track order & ensure uniqueness
        public IReadOnlySet<char> Chars { get; }
    }

    // public interface IMatchRound {
    //     public category: ICategory;
    // }
    // public interface IMatchRoundPhase { }
    // public interface IWordsPhase extends IMatchRoundPhase { }
    // public interface IValidationPhase extends IMatchRoundPhase { }
}
