namespace WordQuest.Domain.Persistence;

// TODO: this type should be inside a framework library or something like .Application.Core
public interface ICollectionView<TItem>
    : IView<TItem>
{
    // TODO: consider changing return type to IReadOnlyCollection
    Task<IReadOnlyList<TItem>> GetAllAsync(CancellationToken cancellationToken = default);
}
