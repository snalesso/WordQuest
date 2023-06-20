using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public sealed class CategoryOption : GuidEntity
{
    public CategoryOption(
        Guid id,
        string name,
        //IReadOnlySet<int> tagIds,
        string? description = null)
        : base(id)
    {
        this.Name = name ?? throw new ArgumentNullException(nameof(name));
        //this.TagIds = tagIds ?? throw new ArgumentNullException(nameof(tagIds));
        this.Description = description;
    }

    public string Name { get; }
    //public IReadOnlySet<int> TagIds { get; }
    public string? Description { get; }
}

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
