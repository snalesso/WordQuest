using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;

namespace WordQuest;

public class EmptyEnumerableException : Exception
{
    #region ctors

    public EmptyEnumerableException() { }

    public EmptyEnumerableException(string paramName) : base($"Param \"{paramName}\" is empty.") { }

    #endregion

    /// <summary>
    /// Throws a new <see cref="EmptyEnumerableException"/> if <paramref name="enumerable"/> is empty.
    /// </summary>
    /// <remarks>Does not check for <see langword="null"></see>.</remarks>
    /// <typeparam name="T"></typeparam>
    /// <param name="enumerable"></param>
    /// <param name="paramName"></param>
    /// <exception cref="EmptyEnumerableException"></exception>
    public static void ThrowIfEmpty<T>(
        IEnumerable<T> enumerable,
        [CallerArgumentExpression("enumerable")] string paramName = null)
    {
        if (!enumerable.Any())
            throw new EmptyEnumerableException(paramName);
    }
}
