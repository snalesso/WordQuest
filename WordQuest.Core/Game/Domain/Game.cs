using WordQuest.Culture.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WordQuest.Game.Domain
{
    public enum Tag
    {
        Geography = 1,
        Science,
        History,
        Technology,
        Social,
        Entertainment,
        Other
    }

    public class Category
    {
        public int LanguageId { get; init; }
        //public AlphabetFamily AlphabetFamily { get; init; }
        public string Name { get; init; }
        public string Description { get; init; }
        [Obsolete("temporary: on net5 use IReadOnlySet")]
        public ISet<int> TagIds { get; init; }
        public bool IsCustom { get; init; }
    }

    public record Word
    {
        public string Value { get; init; }
    }
    public record ValidatedWord : Word
    {
        public IReadOnlyDictionary<string, bool> Votes { get; init; } // player id, vote
    }

    public record MatchRound
    {
        public DateTime StartDateTime { get; init; }
        public IReadOnlyDictionary<string, ValidatedWord> PlayerWords { get; init; }
    }

    public enum MatchMode
    {
        TimeOut = 1,
        Rush = 2
    }

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
        [Obsolete("temporary: on net5 use IReadOnlySet")]

        // TODO: this needs to track order & ensure uniqueness
        public ISet<Category> Categories { get; }
        // TODO: this needs to track order & ensure uniqueness
        public ISet<char> Chars { get; }
    }

    public class MatchSnapshot
    {
        public int Matchid { get; }
        public MatchSettings Settings { get; }
        public DateTime CreationDateTime { get; }
        public DateTime? StartDateTime { get; }
        public DateTime? EndDateTime { get; }

        // public currentRound: IMatchRound;

        public int CurrentRoundIndex { get; }

        // public rounds: Array<Map<ICategory, Map<string, IWord>>>; // [] of category --> player --> word

        // public players: string;
        // public words: IWord[][][]; // 3D array by round
    }

    // public interface IMatchRound {
    //     public category: ICategory;
    // }
    // public interface IMatchRoundPhase { }
    // public interface IWordsPhase extends IMatchRoundPhase { }
    // public interface IValidationPhase extends IMatchRoundPhase { }
}
