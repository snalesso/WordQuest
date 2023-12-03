using WordQuest.Domain.Persistence;

namespace WordQuest.Game.Domain.Persistence;

public interface IAlphabetVariantsRepository : IRepository<IAlphabetVariant, Guid>, IAlphabetVariantFactory
{
}
