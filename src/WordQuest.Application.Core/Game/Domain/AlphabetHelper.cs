using System.Collections.Immutable;
using System.Collections.ObjectModel;
using System.Runtime.CompilerServices;

namespace WordQuest.Game.Domain;

public static class Alphabets
{
    public static IReadOnlyDictionary<char, CharMetadata> Generate(
        char first, char last,
        ISet<char>? exclusions = null,
        ISet<char>? uncommons = null,
        ISet<char>? additions = null)
    {
        var chars = Enumerable
            .Range(first, last - first)
            .Select(x => Convert.ToChar(x));

        if (exclusions != null)
            chars = chars.Except(exclusions);

        return chars
            .Concat(additions ?? ImmutableHashSet<char>.Empty)
            .ToDictionary(
                c => c,
                c => new CharMetadata(uncommons?.Contains(c) ?? false));
    }

    //public static IReadOnlyDictionary<char, CharMetadata> Generate(char first, char last, IEnumerable<char>? exclusions = null, ISet<char>? uncommons = null)
    //  => Generate(first, last, exclusions?.ToHashSet(), uncommons);
    //public static IReadOnlyDictionary<char, CharMetadata> Generate(char first, char last, ISet<char>? exclusions = null, IEnumerable<char>? uncommons = null)
    //  => Generate(first, last, exclusions, uncommons?.ToHashSet());
    //public static IReadOnlyDictionary<char, CharMetadata> Generate(char first, char last, IEnumerable<char>? exclusions = null, IEnumerable<char>? uncommons = null)
    //  => Generate(first, last, exclusions?.ToHashSet(), uncommons?.ToHashSet());
    //public static IReadOnlyDictionary<char, CharMetadata> Generate(int first, int last, ISet<char>? exclusions = null, ISet<char>? uncommons = null)
    //    => Generate((char)first, (char)last, exclusions, uncommons);

    public static IReadOnlyDictionary<char, CharMetadata> Italian { get; } = Generate('A', 'Z', exclusions: new[] { 'J', 'K', 'W', 'X', 'Y' }.ToHashSet(), uncommons: new[] { 'H', 'Q' }.ToHashSet());
    public static IReadOnlyDictionary<char, CharMetadata> English { get; } = Generate('A', 'Z');
    public static IReadOnlyDictionary<char, CharMetadata> French { get; } = Generate('A', 'Z');
    public static IReadOnlyDictionary<char, CharMetadata> German { get; } = Generate('A', 'Z', additions: new[] { 'Ä', 'Ö', 'Ü', 'ẞ' }.ToHashSet());
    public static IReadOnlyDictionary<char, CharMetadata> Spanish { get; } = Generate('A', 'Z', additions: new[] { 'Ñ' }.ToHashSet());
    public static IReadOnlyDictionary<char, CharMetadata> Russian { get; } = Generate('А', 'Я');

    public static IReadOnlyDictionary<LCID, IReadOnlyDictionary<char, CharMetadata>> LanguageAlphabetMap { get; }
        = new ReadOnlyDictionary<LCID, IReadOnlyDictionary<char, CharMetadata>>(
            new Dictionary<LCID, IReadOnlyDictionary<char, CharMetadata>>
            {
                [LCID.Italian] = Italian,
                [LCID.English] = English,
                [LCID.Spanish] = Spanish,
                [LCID.German] = German,
                [LCID.French] = French,
                [LCID.Russian] = Russian
            });
}
