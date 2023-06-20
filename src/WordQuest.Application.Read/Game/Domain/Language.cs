using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public sealed class Language : Int16Entity
{
    public Language(short id, string nativeName) : base(id)
    {
        this.NativeName = nativeName ?? throw new ArgumentNullException(nameof(nativeName));
    }

    public string NativeName { get; }
}
