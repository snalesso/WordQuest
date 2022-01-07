namespace WordQuest.Game.Domain.Entities
{
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

    // public interface IMatchRound {
    //     public category: ICategory;
    // }
    // public interface IMatchRoundPhase { }
    // public interface IWordsPhase extends IMatchRoundPhase { }
    // public interface IValidationPhase extends IMatchRoundPhase { }
}
