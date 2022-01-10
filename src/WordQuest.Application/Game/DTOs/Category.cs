namespace WordQuest.Game.DTOs;

public record Category
{
    public int Id { get; init; }
    public int LanguageId { get; init; }
    public int AlphabetId { get; init; }
    public string Name { get; init; }
    public string? Description { get; init; }
}
