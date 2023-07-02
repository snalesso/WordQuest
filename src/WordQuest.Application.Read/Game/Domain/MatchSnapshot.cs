namespace WordQuest.Game.Domain;

public class MatchSnapshot
{
    public int Id { get; }
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
