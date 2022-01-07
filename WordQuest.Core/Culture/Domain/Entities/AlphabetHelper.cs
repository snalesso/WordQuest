using System;
using System.Collections.Generic;
using System.Linq;

namespace WordQuest.Culture.Domain.Entities
{
    public static class AlphabetHelper
    {
        public static IDictionary<char, CharInfo> InfosOf(char first, char last, ISet<char>? exclusions = null, ISet<char>? uncommons = null)
        {
            var chars = Enumerable
                .Range(first, last - first)
                .Select(x => Convert.ToChar(x));

            if (exclusions != null)
                chars = chars.Except(exclusions);

            return chars
                .ToDictionary(
                    x => x,
                    x => new CharInfo()
                    {
                        IsUncommon = uncommons?.Contains(x) ?? false
                    });
        }

        public static IDictionary<char, CharInfo> InfosOf(int first, int last, ISet<char>? exclusions = null, ISet<char>? uncommons = null) =>
            InfosOf((char)first, (char)last, exclusions, uncommons);

        public static IDictionary<char, CharInfo> BuildCharInfos(char first, char last, ISet<char>? exclusions = null, ISet<char>? uncommons = null) =>
            InfosOf(first, last, exclusions, uncommons);
    }
}
