namespace WordQuest.Game.Domain;

public record MatchRoundPhaseSnapshot
{
    public DateTime StartDateTime { get; init; }
    public DateTime? EndDateTime { get; init; }
}
