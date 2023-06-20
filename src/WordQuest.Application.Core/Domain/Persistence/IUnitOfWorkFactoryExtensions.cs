namespace WordQuest.Domain.Persistence;

public static class IUnitOfWorkFactoryExtensions
{
    public static async Task<TResult> TransactionalAsync<TDbContext, TUnitOfWork, TResult>(
        this IReadWriteUnitOfWorkFactory<TUnitOfWork> unitOfWorkFactory,
        Func<TUnitOfWork, CancellationToken, Task<TResult>> createOperation,
        CancellationToken cancellationToken = default)
        where TUnitOfWork : IReadWriteUnitOfWork<TDbContext>
    {
        await using (var uow = await unitOfWorkFactory.CreateAsync(cancellationToken).ConfigureAwait(false))
        {
            try
            {
                var result = await createOperation(uow.Context, cancellationToken).ConfigureAwait(false);
                await uow.CommitAsync(cancellationToken).ConfigureAwait(false);
                return result;
            }
            catch (Exception)
            {
                await uow.RollbackAsync(cancellationToken).ConfigureAwait(false);
                throw;
            }
        }
    }

    public static Task<TResult> TransactionalAsync<TDbContext, TUnitOfWork, TResult>(
        this IReadWriteUnitOfWorkFactory<TUnitOfWork> unitOfWorkFactory,
        Func<TDbContext, Task<TResult>> createOperation,
        CancellationToken cancellationToken = default)
        where TUnitOfWork : IReadWriteUnitOfWork<TDbContext>
    {
        return unitOfWorkFactory.TransactionalAsync<TDbContext, TUnitOfWork, TResult>(
            (uow, ct) => createOperation(uow.Context),
            cancellationToken);
    }

    public static async Task TransactionalAsync<TDbContext, TUnitOfWork>(
        this IReadWriteUnitOfWorkFactory<TUnitOfWork> unitOfWorkFactory,
        Func<TUnitOfWork, CancellationToken, Task> createOperation,
        CancellationToken cancellationToken = default)
        where TUnitOfWork : IReadWriteUnitOfWork<TDbContext>
    {
        await using (var uow = await unitOfWorkFactory.CreateAsync(cancellationToken).ConfigureAwait(false))
        {
            try
            {
                await createOperation(uow.Context, cancellationToken).ConfigureAwait(false);
                await uow.CommitAsync(cancellationToken).ConfigureAwait(false);
            }
            catch (Exception)
            {
                await uow.RollbackAsync(cancellationToken).ConfigureAwait(false);
                throw;
            }
        }
    }

    public static Task TransactionalAsync<TDbContext, TUnitOfWork>(
        this IReadWriteUnitOfWorkFactory<TUnitOfWork> unitOfWorkFactory,
        Func<TDbContext, Task> createOperation,
        CancellationToken cancellationToken = default)
        where TUnitOfWork : IReadWriteUnitOfWork<TDbContext>
    {
        return unitOfWorkFactory.TransactionalAsync<TDbContext, TUnitOfWork>(
            (uow, ct) => createOperation(uow.Context),
            cancellationToken);
    }
}
