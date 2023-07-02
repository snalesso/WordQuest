namespace WordQuest.Domain.Persistence;

public static class IReadOnlyUnitOfWorkFactoryExtensions
{
    public static async Task<TResult> ExecuteAsync<TDbConnectionContext, TUnitOfWork, TResult>(
        this IReadOnlyUnitOfWorkFactory<TUnitOfWork, TDbConnectionContext> unitOfWorkFactory,
        Func<TDbConnectionContext, CancellationToken, Task<TResult>> createOperation,
        CancellationToken cancellationToken = default)
        where TUnitOfWork : IReadOnlyUnitOfWork<TDbConnectionContext>
    {
        var uow = await unitOfWorkFactory.CreateAsync(cancellationToken).ConfigureAwait(false);
        return await createOperation(uow.Context, cancellationToken).ConfigureAwait(false);
    }

    public static async Task ExecuteAsync<TDbConnectionContext, TUnitOfWork>(
        this IReadOnlyUnitOfWorkFactory<TUnitOfWork, TDbConnectionContext> unitOfWorkFactory,
        Func<TDbConnectionContext, CancellationToken, Task> createOperation,
        CancellationToken cancellationToken = default)
        where TUnitOfWork : IReadOnlyUnitOfWork<TDbConnectionContext>
    {
        var uow = await unitOfWorkFactory.CreateAsync(cancellationToken).ConfigureAwait(false);
        await createOperation(uow.Context, cancellationToken).ConfigureAwait(false);
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