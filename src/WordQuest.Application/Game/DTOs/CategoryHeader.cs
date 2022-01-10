using System;

namespace WordQuest.Game.DTOs
{
    //public record CategoryHeaderDto(
    //    int Id,
    //    string Name,
    //    string Description = null);

    //public record CategoryDto(
    //    int LanguageId,
    //    int AlphabetId,
    //    int Id,
    //    string Name,
    //    string Description = null);

    //public record MatchSettingsDto
    //{
    //    public LCID Language { get; init; }
    //    //public AlphabetFamily AlphabetFamily { get; init; }
    //    public int AlphabetId { get; init; }

    //    public IReadOnlySet<char> AvailableChars { get; init; }
    //    public IReadOnlyCollection<char> OrderedExtractedChars { get; init; }

    //    public ushort RoundsCount { get; init; }
    //    public ushort SecondsPerWord { get; init; }
    //    public bool IsPublic { get; init; } = true;
    //}

    public class CategoryHeader
    {
        public CategoryHeader(int id, string name)
        {
            this.Id = id;
            this.Name = name ?? throw new ArgumentNullException(nameof(name));
        }

        public int Id { get; init; }
        public string Name { get; init; }
        public string? Description { get; init; }
    }
}
