using System;

namespace WordQuest.Game.Application.DTOs
{
    public record MatchSnapshot
    {
        public MatchSnapshot(Guid Id)
        {
            this.Id = Id;
        }

        public Guid Id { get; init; }
        public MatchSettings Settings { get; init; }

        public DateTime CreationDateTime { get; init; }
        public DateTime? StartDateTime { get; init; }
        public DateTime? EndDateTime { get; init; }

        public MatchRoundSnapshot CurrentRound { get; init; }
    }
}
