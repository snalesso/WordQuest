namespace WordQuest.Game.Services;

public interface IMatchService
{
    Task<int> CreateAsync(CancellationToken cancellationToken = default);
}
