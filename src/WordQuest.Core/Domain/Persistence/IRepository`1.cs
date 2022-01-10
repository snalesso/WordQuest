using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WordQuest.Domain.Domain;

namespace WordQuest.Domain.Persistence;

public interface IRepository<TEntity, TId>
    where TEntity : Entity<TId>
    where TId : IEquatable<TId>
{
    Task<IReadOnlyList<TEntity>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TEntity> UpdateAsync(TEntity entity, CancellationToken cancellationToken = default);
    Task<TEntity> UpdateAsync(IReadOnlyDictionary<string, object> changes, CancellationToken cancellationToken = default);
    Task<TEntity> GetAsync(TId id, CancellationToken cancellationToken = default);
    Task DeleteAsync(TId id, CancellationToken cancellationToken = default);
}
