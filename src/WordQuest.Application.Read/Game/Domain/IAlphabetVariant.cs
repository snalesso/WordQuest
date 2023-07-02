using WordQuest.Domain;

namespace WordQuest.Game.Domain;

public interface IAlphabetVariant : IEntity<Guid>
{
    AlphabetFamily AlphabetFamily { get; set; }
    int AlphabetFamilyId { get; set; }
    ILanguage Language { get; set; }
    short LanguageId { get; set; }
}