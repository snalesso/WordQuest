using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Runtime.CompilerServices;

namespace WordQuest
{
    // public interface ILocalizedLanguageOption {
    //     readonly language: Language;
    //     readonly selfLocalizedName: string;
    // }

    public class EmptyEnumerableException : Exception
    {
        public EmptyEnumerableException() { }

        public static void ThrowIfEmpty<T>(
            IEnumerable<T> enumerable,
            [CallerArgumentExpression("enumerable")] string paramName = null)
        {
            if (!enumerable.Any())
                throw new EmptyEnumerableException();
        }
    }
}
