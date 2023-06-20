using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public class Tag : ValueObject<Tag>
{
    public Tag(short value)
    {
        this.Value = value;
    }

    public short Value { get; }

    protected override IEnumerable<object> GetValueIngredients()
    {
        yield return this.Value;
    }
}
