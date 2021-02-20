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
        public int LanguageId { get; set; }
        //public AlphabetFamily AlphabetFamily { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [Obsolete("temporary: on net5 use IReadOnlySet")]
        public ISet<int> TagIds { get; set; }
        public bool IsCustom { get; set; }
    }

    //public record Word
    //{
    //    public string Value { get; set; }
    //}
    //public record ValidatedWord : Word
    //{
    //    public IReadOnlyDictionary<string, bool> Votes { get; set; } // player id, vote
    //}

    //public record MatchRound
    //{
    //    public DateTime StartDateTime { get; set; }
    //    public IReadOnlyDictionary<string, ValidatedWord> PlayerWords { get; set; }
    //}

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
