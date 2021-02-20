using WordQuest.Culture.Domain;
using WordQuest.Domain;
using WordQuest.Game.Domain;
using System;
using System.Collections.Generic;

namespace WordQuest.Web.DTOs
{
    //[obsolete("this class exists only to provide fake data")]
    //public record fakecategoryskeleton
    //{
    //    public string name { get; set; }
    //    [obsolete("temporary: on net5 use ireadonlyset")]
    //    public iset<tag> tags { get; set; }
    //}

    public class TagDto
    {
        public int TagId { get; set; }
        public string LocalizedName { get; set; }
    }

    //public record CategoryHeaderDto(
    //    int Id,
    //    string Name,
    //    string Description = null);

    //[Obsolete("temporary: on net5 use IReadOnlySet")]
    //public record CategoryDto(
    //    int LanguageId,
    //    int AlphabetId,
    //    int Id,
    //    string Name,
    //    string Description = null);

    //public record MatchSettingsDto
    //{
    //    public LCID Language { get; set; }
    //    //public AlphabetFamily AlphabetFamily { get; set; }
    //    public int AlphabetId { get; set; }

    //    [Obsolete("Use readonly set")]
    //    public ISet<char> AvailableChars { get; set; }
    //    public IReadOnlyCollection<char> OrderedExtractedChars { get; set; }

    //    public ushort RoundsCount { get; set; }
    //    public ushort SecondsPerWord { get; set; }
    //    public bool IsPublic { get; set; } = true;
    //}

    public class CategoryHeaderDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = null;
    }

    [Obsolete("temporary: on net5 use IReadOnlySet")]
    public class CategoryDto
    {
        public int Id { get; set; }
        public int LanguageId { get; set; }
        public int AlphabetId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = null;
    }

    public class MatchSettingsDto
    {
        public LCID Language { get; set; }
        //public AlphabetFamily AlphabetFamily { get; set; }
        public int AlphabetId { get; set; }

        [Obsolete("Use readonly set")]
        public ISet<char> AvailableChars { get; set; }
        public IReadOnlyCollection<char> OrderedExtractedChars { get; set; }

        public ushort RoundsCount { get; set; }
        public ushort SecondsPerWord { get; set; }
        public bool IsPublic { get; set; } = true;
    }

    //public class MatchSnapshotDto
    //{
    //    public MatchSnapshotDto(Guid Id)
    //    {
    //        this.Id = Id;
    //    }

    //    public Guid Id { get; set; }
    //    public MatchSettingsDto Settings { get; set; }

    //    public DateTime CreationDateTime { get; set; }
    //    public DateTime? StartDateTime { get; set; }
    //    public DateTime? EndDateTime { get; set; }

    //    public MatchRoundSnapshotDto CurrentRound { get; set; }
    //}

    //public class MatchRoundSnapshotDto
    //{
    //    public WordsFillingPhaseSnapshotDto WordsRoundPhase { get; set; }
    //    public WordsValidationPhaseSnapshotDto WordsValidationRoundPhase { get; set; }
    //}

    //public record MatchRoundPhaseSnapshotDto
    //{
    //    public DateTime StartDateTime { get; set; }
    //    public DateTime? EndDateTime { get; set; }
    //}

    //public record CategoryWordDto
    //{
    //    public int CategoryId { get; set; }
    //    public string CategoryName { get; set; }
    //    public string Word { get; set; }
    //}
    //public record ValidatableCategoryWord : CategoryWordDto
    //{
    //    public IDictionary<Guid, bool> PlayersValidationResults { get; set; }
    //}

    //public record WordsFillingPhaseSnapshotDto : MatchRoundPhaseSnapshotDto
    //{
    //    //public IDictionary<int, CategoryBodyDto> 

    //}
    //public record WordsValidationPhaseSnapshotDto : MatchRoundPhaseSnapshotDto { }
}
