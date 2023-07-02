namespace WordQuest.Game.Domain;

public record MatchRoundSnapshot(
    WordsFillingPhaseSnapshot WordsRoundPhase,
    WordsValidationPhaseSnapshot WordsValidationRoundPhase);
