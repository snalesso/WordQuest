namespace WordQuest.Game.DTOs
{
    public record MatchRoundSnapshot(
        WordsFillingPhaseSnapshot WordsRoundPhase,
        WordsValidationPhaseSnapshot WordsValidationRoundPhase);
}
