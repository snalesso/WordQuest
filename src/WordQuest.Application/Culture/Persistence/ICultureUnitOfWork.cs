using WordQuest.Domain.Persistence;
using WordQuest.Culture.Domain.Persistence;

namespace WordQuest.Culture.Persistence;

public interface ICultureUnitOfWork : IUnitOfWork
{
    ILanguagesRepository Languages { get; }
    IAlphabetsRepository Alphabets { get; }
}
