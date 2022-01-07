using WordQuest.Culture.Domain;
using System;
using System.Collections.Generic;
using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Game.Application.DTOs
{
    public record MatchSettings
    {
        public LCID Language { get; init; }
        //public AlphabetFamily AlphabetFamily { get; init; }
        public int AlphabetId { get; init; }

        public IReadOnlySet<char> AvailableChars { get; init; }
        public IReadOnlyCollection<char> OrderedExtractedChars { get; init; }

        public ushort RoundsCount { get; init; }
        public ushort SecondsPerWord { get; init; }
        public bool IsPublic { get; init; } = true;
    }
}
