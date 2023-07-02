namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreTag
{
    public int Id { get; set; }
    public string InvariantCultureName { get; set; } = null!;

    public virtual ICollection<EfCoreCategoriesTag> CategoriesTags { get; } = new List<EfCoreCategoriesTag>();
}
