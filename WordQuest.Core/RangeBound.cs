using System;

namespace WordQuest
{
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

    // public interface ILocalizedLanguageOption {
    //     readonly language: Language;
    //     readonly selfLocalizedName: string;
    // }
}
