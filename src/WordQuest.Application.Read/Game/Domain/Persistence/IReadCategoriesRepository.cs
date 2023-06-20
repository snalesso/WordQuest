namespace WordQuest.Game.Domain.Persistence;

public interface IReadCategoriesRepository
{
    Task<IReadOnlyList<Category>> GetAllAsync(int alphabetId, CancellationToken cancellationToken = default);
    Task<Category> GetAsync(int id, CancellationToken cancellationToken = default);
}
