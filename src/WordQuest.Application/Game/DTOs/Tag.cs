namespace WordQuest.Game.DTOs
{
    //public record FakeCategorySkeleton
    //{
    //    public string Name { get; init; }
    //    public IReadOnlySet<Tag> Tags { get; init; }
    //}

    public record Tag(int TagId, string LocalizedName);
}
