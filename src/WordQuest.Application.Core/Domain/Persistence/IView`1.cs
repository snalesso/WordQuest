namespace WordQuest.Domain.Persistence;

// TODO: this type should be inside a framework library or something like .Application.Core
public interface IView<TEntity>
{
    // TODO: consider changing return type to IReadOnlyCollection
    Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);
}