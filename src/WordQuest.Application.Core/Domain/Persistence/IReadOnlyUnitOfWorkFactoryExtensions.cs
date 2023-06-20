namespace WordQuest.Domain.Persistence;

public static class IReadOnlyUnitOfWorkFactoryExtensions
{
    public static async Task<TResult> ExecuteAsync<TDbContext, TResult>(
        this IReadOnlyUnitOfWorkFactory<TDbContext> unitOfWorkFactory,
        Func<TDbContext, CancellationToken, Task<TResult>> createOperation,
        CancellationToken cancellationToken = default)
    {
        await using (var uow = await unitOfWorkFactory.CreateAsync(cancellationToken).ConfigureAwait(false))
        {
            return await createOperation(uow.Context, cancellationToken).ConfigureAwait(false);
        }
    }

    //public static Task<TResult> ExecuteAsync<TUnitOfWork, TDbConnectionContext, TResult>(
    //    this IReadOnlyUnitOfWorkFactory<TDbConnectionContext> unitOfWorkFactory,
    //    Func<TDbConnectionContext, Task<TResult>> createOperation,
    //    CancellationToken cancellationToken = default)
    //    where TUnitOfWork : IReadOnlyUnitOfWork<TDbConnectionContext>
    //{
    //    return unitOfWorkFactory.ExecuteAsync<TUnitOfWork, TDbConnectionContext, TResult>(
    //        (dbContext, ct) => createOperation(dbContext),
    //        cancellationToken);
    //}

    public static async Task ExecuteAsync<TUnitOfWork, TDbContext>(
        this IReadOnlyUnitOfWorkFactory<TDbContext> unitOfWorkFactory,
        Func<TDbContext, CancellationToken, Task> asyncAction,
        CancellationToken cancellationToken = default)
    {
        await using (var uow = await unitOfWorkFactory.CreateAsync(cancellationToken).ConfigureAwait(false))
        {
            await asyncAction(uow.Context, cancellationToken).ConfigureAwait(false);
        }
    }
    //public static Task ExecuteAsync<TUnitOfWork, TDbConnectionContext>(
    //    this IReadOnlyUnitOfWorkFactory<TDbConnectionContext> unitOfWorkFactory,
    //    Func<TDbConnectionContext, Task> createOperation,
    //    CancellationToken cancellationToken = default)
    //    where TUnitOfWork : IReadOnlyUnitOfWork<TDbConnectionContext>
    //{
    //    return unitOfWorkFactory.ExecuteAsync<TUnitOfWork, TDbConnectionContext>(
    //        (dbContext, ct) => createOperation(dbContext),
    //        cancellationToken);
    //}
}