namespace WordQuest.Game.Models;

public partial class AlphabetVariant
{
    public AlphabetVariant()
    {
        //this.AlphabetVariantCharsUtf16s = new HashSet<AlphabetVariantCharsUtf16>();
    }

    public Guid Id { get; set; }
    public int LanguageId { get; set; }
    public string? NativeName { get; set; }
    public string? Description { get; set; }

    //public int AlphabetFamilyId { get; set; }

    //public virtual AlphabetFamily AlphabetFamily { get; set; } = null!;
    public virtual Language Language { get; set; } = null!;
    public virtual ICollection<AlphabetVariantCharsUtf16> AlphabetVariantCharsUtf16s { get; set; }
}
