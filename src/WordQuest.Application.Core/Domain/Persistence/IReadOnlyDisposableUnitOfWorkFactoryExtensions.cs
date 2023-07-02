namespace WordQuest.Domain.Persistence;

public static class IReadOnlyDisposableUnitOfWorkFactoryExtensions
{
    public static async Task<TResult> ExecuteAsync<TDbConnectionContext, TUnitOfWork, TResult>(
        this IReadOnlyUnitOfWorkFactory<TUnitOfWork, TDbConnectionContext> unitOfWorkFactory,
        Func<TDbConnectionContext, CancellationToken, Task<TResult>> createOperation,
        CancellationToken cancellationToken = default)
        where TUnitOfWork : IReadOnlyUnitOfWork<TDbConnectionContext>, IAsyncDisposable
    {
        await using (var uow = await unitOfWorkFactory.CreateAsync(cancellationToken).ConfigureAwait(false))
        {
            return await createOperation(uow.Context, cancellationToken).ConfigureAwait(false);
        }
    }

    public static async Task ExecuteAsync<TDbConnectionContext, TUnitOfWork>(
        this IReadOnlyUnitOfWorkFactory<TUnitOfWork, TDbConnectionContext> unitOfWorkFactory,
        Func<TDbConnectionContext, CancellationToken, Task> createOperation,
        CancellationToken cancellationToken = default)
        where TUnitOfWork : IReadOnlyUnitOfWork<TDbConnectionContext>, IAsyncDisposable
    {
        await using (var uow = await unitOfWorkFactory.CreateAsync(cancellationToken).ConfigureAwait(false))
        {
            await createOperation(uow.Context, cancellationToken).ConfigureAwait(false);
        }
    }
}