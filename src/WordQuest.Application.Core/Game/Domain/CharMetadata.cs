using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public class CharMetadata : ValueObject<CharMetadata>
{
    public CharMetadata(bool isUncommon)
    {
        this.IsUncommon = isUncommon;
    }

    public bool IsUncommon { get; }

    protected override IEnumerable<object> GetValueIngredients()
    {
        yield return this.IsUncommon;
    }
}
