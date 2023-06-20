using System.Collections.Immutable;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

internal class AlphabetVariants
{
    public static AlphabetVariants Instance { get; } = new();

    private AlphabetVariants() { }

    private static readonly Lazy<IReadOnlyDictionary<ushort, IReadOnlyDictionary<Guid, AlphabetVariant>>> _lazyMap =
        new(CreateLanguageAlphabetsMap, LazyThreadSafetyMode.ExecutionAndPublication);
    public static IReadOnlyDictionary<ushort, IReadOnlyDictionary<Guid, AlphabetVariant>> Map => _lazyMap.Value;

    private static readonly Lazy<IReadOnlyList<AlphabetVariant>> _lazyAll =
        new(() => Map.SelectMany(x => x.Value.Values).ToArray(), LazyThreadSafetyMode.ExecutionAndPublication);
    public static IReadOnlyList<AlphabetVariant> All => _lazyAll.Value;

    private static IReadOnlyDictionary<ushort, IReadOnlyDictionary<Guid, AlphabetVariant>> CreateLanguageAlphabetsMap()
    {
        var result = new[]
        {
            // english
            new AlphabetVariant(Languages.English, Alphabets.English, 0),

            // italian
            new AlphabetVariant(Languages.Italian, Alphabets.Italian, 0),
            
            // german
            new AlphabetVariant(Languages.German, Alphabets.German, 0),
            
            // russian
            new AlphabetVariant(Languages.Russian, Alphabets.Russian, 0),
            
            // spanish
            new AlphabetVariant(Languages.Spanish, Alphabets.Spanish, 0),
            
            // french
            new AlphabetVariant(Languages.French, Alphabets.French, 0),
        }
        .GroupBy(alphabet => alphabet.Language.Id)
        .ToDictionary(
            languageGroup => languageGroup.Key,
            group => group.ToDictionary(
                alphabet => alphabet.Id,
                alphabet => alphabet)
            .AsReadOnly());

        return result;
    }
}
