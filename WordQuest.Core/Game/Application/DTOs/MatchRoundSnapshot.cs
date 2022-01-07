namespace WordQuest.Game.Application.DTOs
{
    public record MatchRoundSnapshot(
        WordsFillingPhaseSnapshot WordsRoundPhase,
        WordsValidationPhaseSnapshot WordsValidationRoundPhase);
}
