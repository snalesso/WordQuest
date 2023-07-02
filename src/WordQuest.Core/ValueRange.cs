using System;

namespace WordQuest;

public class ValueRange<T>
    where T : IComparable<T>
{
    public ValueRange(
        T lower,
        T upper,
        RangeBoundMode lowerMode = RangeBoundMode.Inclusive,
        RangeBoundMode upperMode = RangeBoundMode.Inclusive)
    {
        this.LowerBound = new ValueRangeBound<T>(lower, lowerMode);
        this.UpperBound = new ValueRangeBound<T>(upper, upperMode);
    }

    public ValueRangeBound<T> LowerBound { get; }
    public ValueRangeBound<T> UpperBound { get; }

    public virtual bool Includes(T value)
    {
        var comparedToLower = value.CompareTo(this.LowerBound.Value);
        if (comparedToLower < 0)
            return false;
        if (comparedToLower == 0 && this.LowerBound.Mode == RangeBoundMode.Exclusive)
            return false;

        var comparedToUpper = value.CompareTo(this.UpperBound.Value);
        if (comparedToUpper > 0)
            return false;
        if (comparedToUpper == 0 && this.UpperBound.Mode == RangeBoundMode.Exclusive)
            return false;

        return true;
    }
}
