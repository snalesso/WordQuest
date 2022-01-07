using System.Collections.Immutable;
using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Culture.Domain.Persistence
{
    public static class Alphabets
    {
        private static readonly Lazy<IReadOnlyDictionary<LCID, IReadOnlyDictionary<int, IReadOnlyDictionary<char, CharInfo>>>> _lazyMap = new(
            CreateLanguageAlphabetsMap,
            LazyThreadSafetyMode.ExecutionAndPublication);
        public static IReadOnlyDictionary<LCID, IReadOnlyDictionary<int, IReadOnlyDictionary<char, CharInfo>>> Map => _lazyMap.Value;

        private static IReadOnlyDictionary<LCID, IReadOnlyDictionary<int, IReadOnlyDictionary<char, CharInfo>>> CreateLanguageAlphabetsMap()
        {
            var id = 0;
            var getNewId = () =>
            {
                Interlocked.Increment(ref id);
                return id;
            };
            var dict = new Dictionary<LCID, IReadOnlyDictionary<int, IReadOnlyDictionary<char, CharInfo>>>();

            // english
            dict.Add(
                LCID.English,
                new[] { AlphabetHelper.InfosOf('A', 'Z').ToImmutableDictionary() }.ToImmutableDictionary(_ => getNewId(), x => x as IReadOnlyDictionary<char, CharInfo>));

            // italian
            var italianChars = AlphabetHelper.InfosOf('A', 'Z', exclusions: new[] { 'J', 'K', 'W', 'X', 'Y' }.ToHashSet(), uncommons: new[] { 'H', 'Q' }.ToHashSet());
            dict.Add(
                LCID.Italian,
                new[] { italianChars.ToImmutableDictionary() }.ToImmutableDictionary(_ => getNewId(), x => x as IReadOnlyDictionary<char, CharInfo>));

            // german
            var germanChars = AlphabetHelper.InfosOf('A', 'Z');
            germanChars.Add('Ä', new());
            germanChars.Add('Ö', new());
            germanChars.Add('Ü', new());
            germanChars.Add('ẞ', new());
            dict.Add(
                LCID.German, 
                new[] { germanChars.ToImmutableDictionary() }.ToImmutableDictionary(_ => getNewId(), x => x as IReadOnlyDictionary<char, CharInfo>));

            // russian
            dict.Add
                (LCID.Russian, 
                new [] { AlphabetHelper.InfosOf(1040, 1071).ToImmutableDictionary() }.ToImmutableDictionary(_ => getNewId(), x => x as IReadOnlyDictionary<char, CharInfo>));

            // spanish
            var spanishChars = AlphabetHelper.InfosOf('A', 'Z');
            spanishChars.Add('Ñ', new());
            dict.Add(
                LCID.Spanish,
                new[] { spanishChars.ToImmutableDictionary() }.ToImmutableDictionary(_ => getNewId(), x => x as IReadOnlyDictionary<char, CharInfo>));

            // french
            var frenchChars = AlphabetHelper.InfosOf(1040, 1071);
            dict.Add(
                LCID.French,
                new[] { frenchChars.ToImmutableDictionary() }.ToImmutableDictionary(_ => getNewId(), x => x as IReadOnlyDictionary<char, CharInfo>));

            return dict.ToImmutableDictionary();
        }
    }
}