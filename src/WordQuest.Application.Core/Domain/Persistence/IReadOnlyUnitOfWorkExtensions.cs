//namespace WordQuest.Domain.Persistence;

//public static class IReadOnlyUnitOfWorkExtensions
//{
//    public static Task TransactionalAsync<TDbConnectionContext, TUnitOfWork>(
//        this TUnitOfWork unitOfWork,
//        Func<TDbConnectionContext, CancellationToken, Task> createOperation,
//        CancellationToken cancellationToken = default)
//        where TUnitOfWork : IReadOnlyUnitOfWork<TDbConnectionContext>
//    {
//        return unitOfWork.TransactionalAsync(async (ctx, ct) =>
//        {
//            await createOperation(ctx, ct);
//        }, cancellationToken);
//    }
//}