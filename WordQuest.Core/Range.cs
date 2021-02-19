using System;
using System.Collections.Generic;

namespace WordQuest.Culture
{
    public enum RangeBoundMode
    {
        Inclusive,
        Exclusive
    }

    public class RangeBound<T>
        where T : IComparable<T>
    {
        public RangeBound(T value, RangeBoundMode mode)
        {
            this.Value = value;
            this.Mode = mode;
        }

        public T Value { get; }
        public RangeBoundMode Mode { get; }
    }

    public class Range<T>
        where T : IComparable<T>
    {
        public Range(T lower, RangeBoundMode lowerMode, T upper, RangeBoundMode upperMode)
        {
            this.LowerBound = new RangeBound<T>(lower, lowerMode);
            this.UpperBound = new RangeBound<T>(upper, upperMode);
        }

        public RangeBound<T> LowerBound { get; }
        public RangeBound<T> UpperBound { get; }

        [Obsolete("temporary: on net5 use IReadOnlySet")]
        public ISet<T> Exclusions { get; set; }
    }

    // public interface ILocalizedLanguageOption {
    //     readonly language: Language;
    //     readonly selfLocalizedName: string;
    // }
}
