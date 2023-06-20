using WordQuest.Game.Domain.Dtos;

namespace WordQuest.Game.Domain.Persistence;

public class InMemoryLanguageOptionsView : ILanguageOptionsView
{
    public Task<LanguageOption> GetAsync(int id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<LanguageOption>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    //public static IImmutableDictionary<LCID, Language> All { get; } =
    //    new[]
    //    {
    //        new Language(
    //            (int)LCID.Italian,
    //            "Italiano",
    //            LCID.Italian,
    //            Alphabets
    //                .Map[LCID.Italian]
    //                .Select(kvp => new AlphabetVariant(kvp.Key, nameof(LCID.Italian), kvp.Value.))
    //                .ToImmutableArray(),
    //            //new[]
    //            //{
    //            //    new AlphabetVariant(
    //            //        (int)LCID.Italian,
    //            //        nameof(LCID.Italian),
    //            //        (int)LCID.Italian,
    //            //        LanguageCharInfos[LCID.Italian].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
    //            //}),
    //        new Language(
    //            (int)LCID.English,
    //            "English",
    //            LCID.English,
    //            new[]
    //            {
    //                new AlphabetVariant(
    //                    (int)LCID.English,
    //                    nameof(LCID.English),
    //                    (int)LCID.English,
    //                    LanguageCharInfos[LCID.English].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
    //            }),
    //        new Language(
    //            (int)LCID.German,
    //            "Deutsch",
    //            LCID.German,
    //            new[]
    //            {
    //                new AlphabetVariant(
    //                    (int)LCID.German,
    //                    nameof(LCID.German),
    //                    (int)LCID.German,
    //                    LanguageCharInfos[LCID.German].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
    //            }),
    //        new Language(
    //            (int)LCID.French,
    //            "Français",
    //            LCID.French,
    //            new[]
    //            {
    //                new AlphabetVariant(
    //                    (int)LCID.French,
    //                    nameof(LCID.French),
    //                    (int)LCID.French,
    //                    LanguageCharInfos[LCID.French].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
    //            }),
    //        new Language(
    //            (int)LCID.Russian,
    //            "Русский",
    //            LCID.Russian,
    //            new[]
    //            {
    //                new AlphabetVariant(
    //                    (int)LCID.Russian,
    //                    nameof(LCID.Russian),
    //                    (int)LCID.Russian,
    //                    LanguageCharInfos[LCID.Russian].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
    //            }),
    //        new Language(
    //            (int)LCID.Spanish,
    //            "Español",
    //            LCID.Spanish,
    //            new[]
    //            {
    //                new AlphabetVariant(
    //                    (int)LCID.Spanish,
    //                    nameof(LCID.Spanish),
    //                    (int)LCID.Spanish,
    //                    LanguageCharInfos[LCID.Spanish].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
    //            })
    //    }
    //    .ToImmutableDictionary(x => x.LCID, x => x);

    //public static IImmutableDictionary<LCID, IImmutableDictionary<char, CharInfo>> LanguageCharInfos { get; } = new Dictionary<LCID, IImmutableDictionary<char, CharInfo>>()
    //{
    //    [LCID.English] = AlphabetHelper.Generate(65, 90).ToImmutableDictionary(),
    //    [LCID.Italian] = AlphabetHelper
    //        .Generate(
    //            65, 90,
    //            exclusions: new[] { 'J', 'K', 'W', 'X', 'Y' }.ToHashSet(),
    //            uncommons: new[] { 'H', 'Q' }.ToHashSet())
    //        .ToImmutableDictionary(),
    //    [LCID.Russian] = AlphabetHelper.Generate(1040, 1071).ToImmutableDictionary(),
    //    [LCID.German] = AlphabetHelper.Generate(65, 90).ToImmutableDictionary(),
    //    [LCID.Spanish] = AlphabetHelper.Generate(65, 90).ToImmutableDictionary(),
    //    [LCID.French] = AlphabetHelper.Generate(65, 90).ToImmutableDictionary(),
    //}
    //.ToImmutableDictionary();
}
