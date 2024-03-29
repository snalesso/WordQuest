using System.Collections;

namespace WordQuest.Domain;

public abstract class ValueObject<T> : IEquatable<T>, IStructuralEquatable
    where T : ValueObject<T>
{
    protected ValueObject()
    {
    }

    /// <summary>
    /// Returns the <see cref="object"/>s used by <see cref="GetHashCode()"/> to compose the <see cref="T"/>'s value as a <see cref="ValueObject{T}"/>.
    /// </summary>
    /// <param name="other"></param>
    /// <returns></returns>
    protected abstract IEnumerable<object> GetValueIngredients();

    /// <summary>
    /// Provides the hashcode of the the <see cref="T"/>'s value as a <see cref="ValueObject{T}"/>.
    /// </summary>
    /// <returns></returns>
    public sealed override int GetHashCode()
    {
        return HashCode.Combine(this.GetValueIngredients());
    }

    ///// <summary>
    ///// Compares this <see cref="T"/> with another <see cref="T"/> != <see langword="null"/>.
    ///// </summary>
    ///// <param name="other"></param>
    ///// <returns></returns>
    //protected abstract bool EqualsCore(T other);

    /// <summary>
    /// Compares two <see cref="T"/>s.
    /// </summary>
    /// <param name="other"></param>
    /// <returns></returns>
    public bool Equals(T? other)
    {
        if (other is null)
            return false;

        if (ReferenceEquals(this, other))
            return true;

        if (this.GetType() != other.GetType()) // TODO: does this work if I pass an inheriting class instance??
            return false;

        return this.GetValueIngredients().SequenceEqual(other.GetValueIngredients());
    }

    /// <summary>
    /// Compares the current <see cref="T"/> with another <see cref="object"/> checking if, as a whole, they represent the same value.
    /// </summary>
    /// <param name="obj"></param>
    /// <returns></returns>
    public override bool Equals(object? obj)
    {
        return this.Equals(obj as T); // TODO: add type checking: test derived type casting
    }

    /// <summary>
    /// Checks if the two <see cref="T"/>s are equal by reference or value.
    /// </summary>
    /// <param name="left"></param>
    /// <param name="right"></param>
    /// <returns></returns>
    public static bool operator ==(ValueObject<T>? left, ValueObject<T>? right)
    {
        if (left is null ^ right is null)
            return false;

        return left is null || left.Equals(right);
    }

    /// <summary>
    /// Checks if the two <see cref="T"/>s are not equal by reference or value.
    /// </summary>
    /// <param name="left"></param>
    /// <param name="right"></param>
    /// <returns></returns>
    public static bool operator !=(ValueObject<T>? left, ValueObject<T>? right)
    {
        return !(left == right);
    }

    #region IStructuralEquatable

    public bool Equals(object? other, IEqualityComparer comparer)
    {
        throw new NotImplementedException();
    }

    public int GetHashCode(IEqualityComparer comparer)
    {
        throw new NotImplementedException();
    }

    #endregion
}
