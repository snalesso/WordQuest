namespace WordQuest.Domain.Persistence;

public interface IView<TDto, TIdentity>
    : IView<TDto>
    where TIdentity : IEquatable<TIdentity>
    where TDto : IEntity<TIdentity>
{
}
