namespace WordQuest.Game.Models;

public partial class Tag
{
    public Tag()
    {
        this.Categories = new HashSet<Category>();
    }

    public int Id { get; set; }
    public string InvariantCultureName { get; set; } = null!;

    public virtual ICollection<Category> Categories { get; set; }
}
