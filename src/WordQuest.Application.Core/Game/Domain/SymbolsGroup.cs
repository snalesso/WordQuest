namespace WordQuest.Game.Domain;

public class SymbolsGroup
{
    public int Id { get; set; }
    public string Description { get; set; }
    public IReadOnlySet<char> Chars_UTF16 { get; set; }
    public ValueRange<char> Chars_UTF16_generator { get; set; }
}
