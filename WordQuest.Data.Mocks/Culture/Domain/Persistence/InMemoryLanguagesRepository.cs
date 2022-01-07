using System.Collections.Immutable;
using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Culture.Domain.Persistence
{
    public class InMemoryLanguagesRepository : ILanguagesRepository
    {
        public Task<IEnumerable<Language>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            return Task.FromResult(All.Values);
        }

        public static IImmutableDictionary<LCID, Language> All { get; } =
            new[]
            {
                new Language(
                    (int)LCID.Italian,
                    "Italiano",
                    LCID.Italian,
                    new[]
                    {
                        new AlphabetVariant(
                            (int)LCID.Italian,
                            nameof(LCID.Italian),
                            (int)LCID.Italian,
                            LanguageCharInfos[LCID.Italian].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                    }),
                new Language(
                    (int)LCID.English,
                    "English",
                    LCID.English,
                    new[]
                    {
                        new AlphabetVariant(
                            (int)LCID.English,
                            nameof(LCID.English),
                            (int)LCID.English,
                            LanguageCharInfos[LCID.English].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                    }),
                new Language(
                    (int)LCID.German,
                    "Deutsch",
                    LCID.German,
                    new[]
                    {
                        new AlphabetVariant(
                            (int)LCID.German,
                            nameof(LCID.German),
                            (int)LCID.German,
                            LanguageCharInfos[LCID.German].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                    }),
                new Language(
                    (int)LCID.French,
                    "Français",
                    LCID.French,
                    new[]
                    {
                        new AlphabetVariant(
                            (int)LCID.French,
                            nameof(LCID.French),
                            (int)LCID.French,
                            LanguageCharInfos[LCID.French].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                    }),
                new Language(
                    (int)LCID.Russian,
                    "Русский",
                    LCID.Russian,
                    new[]
                    {
                        new AlphabetVariant(
                            (int)LCID.Russian,
                            nameof(LCID.Russian),
                            (int)LCID.Russian,
                            LanguageCharInfos[LCID.Russian].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                    }),
                new Language(
                    (int)LCID.Spanish,
                    "Español",
                    LCID.Spanish,
                    new[]
                    {
                        new AlphabetVariant(
                            (int)LCID.Spanish,
                            nameof(LCID.Spanish),
                            (int)LCID.Spanish,
                            LanguageCharInfos[LCID.Spanish].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                    })
            }
            .ToImmutableDictionary(x => x.LCID, x => x);

        public static IImmutableDictionary<LCID, IImmutableDictionary<char, CharInfo>> LanguageCharInfos { get; } = new Dictionary<LCID, IImmutableDictionary<char, CharInfo>>()
        {
            [LCID.English] = AlphabetHelper.InfosOf(65, 90).ToImmutableDictionary(),
            [LCID.Italian] = AlphabetHelper
                .InfosOf(
                    65, 90,
                    exclusions: new[] { 'J', 'K', 'W', 'X', 'Y' }.ToHashSet(),
                    uncommons: new[] { 'H', 'Q' }.ToHashSet())
                .ToImmutableDictionary(),
            [LCID.Russian] = AlphabetHelper.InfosOf(1040, 1071).ToImmutableDictionary()
        }
        .ToImmutableDictionary();
    }
}
