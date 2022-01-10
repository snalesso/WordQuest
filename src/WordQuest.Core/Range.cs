using System;
using System.Collections.Generic;

namespace WordQuest
{
    public class Range<T>
        where T : IComparable<T>
    {
        public Range(
            T lower,
            T upper,
            RangeBoundMode lowerMode = RangeBoundMode.Inclusive,
            RangeBoundMode upperMode = RangeBoundMode.Inclusive)
        {
            this.LowerBound = new RangeBound<T>(lower, lowerMode);
            this.UpperBound = new RangeBound<T>(upper, upperMode);
        }

        public RangeBound<T> LowerBound { get; }
        public RangeBound<T> UpperBound { get; }

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
}
