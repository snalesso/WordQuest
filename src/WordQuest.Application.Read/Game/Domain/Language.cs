using System.Diagnostics.CodeAnalysis;
using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public sealed class Language : Int16Entity, IEntity<short>, ILanguage
{
    [SetsRequiredMembers]
    public Language(short id, string nativeName) : base(id)
    {
        this.NativeName = nativeName ?? throw new ArgumentNullException(nameof(nativeName));
    }

    public string NativeName { get; }
}
