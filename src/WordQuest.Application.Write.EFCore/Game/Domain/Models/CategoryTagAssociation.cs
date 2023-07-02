public class CategoryTagAssociation
{
    public CategoryTagAssociation(int categoryId, int tagId)
    {
        this.CategoryId = categoryId;
        this.TagId = tagId;
    }

    public int CategoryId { get; private init; }
    public int TagId { get; private init; }
}
