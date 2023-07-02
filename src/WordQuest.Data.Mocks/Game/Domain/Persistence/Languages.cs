using System.Collections.Immutable;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

internal static class Languages
{
    private static readonly Lazy<IReadOnlyDictionary<ushort, string>> _lazyNativeNamesMap = new(CreateNativeNamesMap, LazyThreadSafetyMode.ExecutionAndPublication);
    public static IReadOnlyDictionary<ushort, string> NativeNames => _lazyNativeNamesMap.Value;

    private static readonly Lazy<IReadOnlyDictionary<ushort, Language>> _lazyMap = new(CreateLanguagesMap, LazyThreadSafetyMode.ExecutionAndPublication);

    public static IReadOnlyDictionary<ushort, Language> Map => _lazyMap.Value;

    private static readonly Lazy<IReadOnlyList<Language>> _lazyAll = new(() => Map.Values.ToImmutableArray(), LazyThreadSafetyMode.ExecutionAndPublication);
    public static IReadOnlyList<Language> All => _lazyAll.Value;

    private static IReadOnlyDictionary<ushort, string> CreateNativeNamesMap()
    {
        return new Dictionary<ushort, string>()
        {
            [(ushort)LCID.Italian] = "Italiano",
            [(ushort)LCID.English] = "English",
            [(ushort)LCID.Spanish] = "Español",
            [(ushort)LCID.Russian] = "Русский",
            [(ushort)LCID.French] = "Français",
            [(ushort)LCID.German] = "Deutsch"
        };
    }

    public static void Create()
    {
        var italian = new Language(
            (int)LCID.Italian,
            "Italiano",
            Enumerable.Empty<AlphabetVariant>());
    }

    private static Language CreateLanguage(LCID lcid)
    {
        var langId = (ushort)lcid;
        return new Language(langId, NativeNames[langId], AlphabetVariants.Map[langId].Values.ToImmutableArray());
    }

    public static Language Italian => CreateLanguage(LCID.Italian);
    public static Language English => CreateLanguage(LCID.English);
    public static Language French => CreateLanguage(LCID.French);
    public static Language German => CreateLanguage(LCID.German);
    public static Language Spanish => CreateLanguage(LCID.Spanish);
    public static Language Russian => CreateLanguage(LCID.Russian);

    private static IReadOnlyDictionary<ushort, Language> CreateLanguagesMap()
    {
        var languages = new[] { Italian, English, Spanish, French, German, Russian };
        var builder = ImmutableDictionary.CreateBuilder<ushort, Language>();
        builder.AddRange(languages.Select(lang => new KeyValuePair<ushort, Language>(lang.Id, lang)));
        return builder.ToImmutable();
    }
}
