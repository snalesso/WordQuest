namespace WordQuest.Game.DTOs
{
    public record CategoryWord
    {
        public int CategoryId { get; init; }
        public string CategoryName { get; init; }
        public string Word { get; init; }
    }
}
