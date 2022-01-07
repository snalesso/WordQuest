using System;

namespace WordQuest.Game.Application.DTOs
{
    public record MatchRoundPhaseSnapshot
    {
        public DateTime StartDateTime { get; init; }
        public DateTime? EndDateTime { get; init; }
    }
}
