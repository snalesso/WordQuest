using WordQuest.Culture.Domain;
using WordQuest.Domain;
using WordQuest.Game.Domain;
using System;
using System.Collections.Generic;

namespace WordQuest.Web.DTOs
{
    [Obsolete("This class exists only to provide fake data")]
    public record FakeCategorySkeleton
    {
        public string Name { get; init; }
        [Obsolete("temporary: on net5 use IReadOnlySet")]
        public ISet<Tag> Tags { get; init; }
    }

    public record TagDto(int TagId, string LocalizedName);

    public record CategoryHeaderDto(
        int Id,
        string Name,
        string Description = null);

    [Obsolete("temporary: on net5 use IReadOnlySet")]
    public record CategoryDto(
        int LanguageId,
        int AlphabetId,
        int Id,
        string Name,
        string Description = null);

    public record MatchSettingsDto
    {
        public LCID Language { get; init; }
        //public AlphabetFamily AlphabetFamily { get; init; }
        public int AlphabetId { get; init; }

        [Obsolete("Use readonly set")]
        public ISet<char> AvailableChars { get; init; }
        public IReadOnlyCollection<char> OrderedExtractedChars { get; init; }

        public ushort RoundsCount { get; init; }
        public ushort SecondsPerWord { get; init; }
        public bool IsPublic { get; init; } = true;
    }

    public class MatchSnapshotDto
    {
        public MatchSnapshotDto(Guid Id)
        {
            this.Id = Id;
        }

        public Guid Id { get; init; }
        public MatchSettingsDto Settings { get; init; }

        public DateTime CreationDateTime { get; init; }
        public DateTime? StartDateTime { get; init; }
        public DateTime? EndDateTime { get; init; }

        public MatchRoundSnapshotDto CurrentRound { get; init; }
    }

    public class MatchRoundSnapshotDto
    {
        public WordsFillingPhaseSnapshotDto WordsRoundPhase { get; init; }
        public WordsValidationPhaseSnapshotDto WordsValidationRoundPhase { get; init; }
    }

    public record MatchRoundPhaseSnapshotDto
    {
        public DateTime StartDateTime { get; init; }
        public DateTime? EndDateTime { get; init; }
    }

    public record CategoryWordDto
    {
        public int CategoryId { get; init; }
        public string CategoryName { get; init; }
        public string Word { get; init; }
    }
    public record ValidatableCategoryWord : CategoryWordDto
    {
        public IDictionary<Guid, bool> PlayersValidationResults { get; init; }
    }

    public record WordsFillingPhaseSnapshotDto : MatchRoundPhaseSnapshotDto
    {
        //public IDictionary<int, CategoryBodyDto> 

    }
    public record WordsValidationPhaseSnapshotDto : MatchRoundPhaseSnapshotDto { }
}
