using WordQuest.Culture.Domain;
using WordQuest.Web.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WordQuest.Web.Data
{
    internal static class CharsHelper
    {
        public static IDictionary<char, CharInfo> InfosOf(int first, int last, ISet<char> exclusions = null, ISet<char> uncommons = null)
        {
            return Enumerable
                .Range(first, last - first)
                .Select(x => Convert.ToChar(x))
                .Where(x => !exclusions?.Contains(x) ?? true)
                .Select(x => new CharInfo()
                {
                    Char = x,
                    IsUncommon = uncommons?.Contains(x) ?? false
                })
                .ToDictionary(x => x.Char, x => x);
        }
        public static IDictionary<char, CharInfo> BuildCharInfos(char first, char last, ISet<char> exclusions = null, ISet<char> uncommons = null)
        {
            return InfosOf((int)first, (int)last, exclusions, uncommons);
        }
    }
}
