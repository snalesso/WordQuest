using WordQuest.Domain;

namespace WordQuest.Game.Domain.Persistence;

public partial class EfCoreAlphabetVariant //: GuidEntity, IEntity<Guid>, IAlphabetVariant
{
    //public AlphabetVariant(Guid id) : base(id) { }

    required public Guid Id { get; init; }
    required public short LanguageId { get; init; }
    required public int AlphabetFamilyId { get; init; }
    //public AlphabetFamily Family { get; init; }

    public virtual EfCoreAlphabetFamily AlphabetFamily { get; set; } = null!;
    public virtual EfCoreLanguage Language { get; set; } = null!;
    public virtual ICollection<EfCoreAlphabetVariantCharsUtf16> AlphabetVariantCharsUtf16s { get; } = new List<EfCoreAlphabetVariantCharsUtf16>();
    public virtual ICollection<EfCoreCategory> Categories { get; } = new List<EfCoreCategory>();
}
