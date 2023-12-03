//using WordQuest.Domain;

//namespace WordQuest.Game.Domain.Entities;

//public class Category : GuidEntity
//{
//    public Category(
//        Guid id,
//        AlphabetVariant alphabetVariant,
//        string name,
//        string? description,
//        IReadOnlySet<int> tagIds,
//        bool isCustom)
//        : base(id)
//    {
//        // TODO: tags not empty

//        this.AlphabetVariant = alphabetVariant ?? throw new ArgumentNullException(nameof(alphabetVariant));
//        this.Name = name ?? throw new ArgumentNullException(nameof(name));
//        this.Description = description;
//        this.TagIds = tagIds ?? throw new ArgumentNullException(nameof(tagIds));
//        this.IsCustom = isCustom;
//    }

//    public Category(
//        AlphabetVariant alphabetVariant,
//        string name,
//        string? description,
//        IReadOnlySet<int> tagIds,
//        bool isCustom)
//        : this(
//              Guid.NewGuid(),
//              alphabetVariant,
//              name,
//              description,
//              tagIds,
//              isCustom)
//    { }

//    public AlphabetVariant AlphabetVariant { get; }

//    public string Name { get; }

//    public string? Description { get; }

//    /// <summary>
//    /// May reflect Tag enum value
//    /// </summary>
//    public IReadOnlySet<int> TagIds { get; }

//    public bool IsCustom { get; }

//    public void Rename(string newName)
//    {
//        throw new NotImplementedException();
//    }

//    public void ChangeDescription(string newName)
//    {
//        throw new NotImplementedException();
//    }
//}

//// public interface IMatchRound {
////     public category: ICategory;
//// }
//// public interface IMatchRoundPhase { }
//// public interface IWordsPhase extends IMatchRoundPhase { }
//// public interface IValidationPhase extends IMatchRoundPhase { }
