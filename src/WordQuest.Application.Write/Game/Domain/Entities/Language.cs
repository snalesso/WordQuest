using WordQuest.Domain;

namespace WordQuest.Game.Domain.Entities;

/// <remarks>Being <see cref="short"/>, <see cref="Entity{short}.Id"/> can be initialized using <see cref="LCID"/>.</remarks>
public partial class Language : Int16Entity
{
    public Language(
        short id,
        string? nativeName)
        : base(id)
    {
        ArgumentNullException.ThrowIfNull(nativeName);

        this.NativeName = nativeName;
    }

    public string NativeName { get; }
}
