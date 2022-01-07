using System.Collections.Immutable;
using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Culture.Domain.Persistence
{
    public static class Languages
    {
        private static readonly Lazy<IReadOnlyDictionary<LCID, Language>> _lazyMap = new(
            Languages.CreateMap,
            LazyThreadSafetyMode.ExecutionAndPublication);
        public static IReadOnlyDictionary<LCID, Language> Map => _lazyMap.Value;

        private static readonly Lazy<IReadOnlyList<Language>> _lazyAll = new(
            () => Languages.Map.Values.ToImmutableArray(),
            LazyThreadSafetyMode.ExecutionAndPublication);
        public static IReadOnlyList<Language> All => _lazyAll.Value;

        private static IReadOnlyDictionary<LCID, Language> CreateMap()
        {
            return new Dictionary<LCID, Language>()
            {
                {
                    LCID.Italian,
                    new Language(
                        (int)LCID.Italian, "Italiano", LCID.Italian,
                        Alphabets.Map[LCID.Italian]
                            .Select(kvp =>
                                new AlphabetVariant(
                                    kvp.Key,
                                    $"{nameof(LCID.Italian)}#{kvp.Key}",
                                    (int)LCID.Italian,
                                    kvp.Value.ToImmutableDictionary(x=>x.Key, x=>x.Value.IsUncommon)))
                            .ToImmutableArray()
                    )
                        //new[]
                        //{
                        //    new AlphabetVariant(
                        //        (int)LCID.Italian, nameof(LCID.Italian), (int)LCID.Italian,
                        //        Alphabets.Map[LCID.Italian].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                        //})
                },
                //{
                //    LCID.English,
                //    new Language(
                //        (int)LCID.English, "English", LCID.English,
                //        new[]
                //        {
                //            new AlphabetVariant(
                //                (int)LCID.English, nameof(LCID.English), (int)LCID.English,
                //                Alphabets.Map[LCID.English].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                //        })
                //},
                //{
                //    LCID.German,
                //    new Language(
                //        (int)LCID.German, "Deutsch", LCID.German,
                //        new[]
                //        {
                //            new AlphabetVariant(
                //                (int)LCID.German, nameof(LCID.German), (int)LCID.German,
                //                Alphabets.Map[LCID.German].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                //        })
                //},
                //{
                //    LCID.French,
                //    new Language(
                //        (int)LCID.French, "Français", LCID.French,
                //        new[]
                //        {
                //            new AlphabetVariant(
                //                (int)LCID.French, nameof(LCID.French), (int)LCID.French,
                //                Alphabets.Map[LCID.French].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                //        })
                //},
                //{
                //    LCID.Russian,
                //    new Language(
                //        (int)LCID.Russian, "Русский", LCID.Russian,
                //        new[]
                //        {
                //            new AlphabetVariant(
                //                (int)LCID.Russian, nameof(LCID.Russian), (int)LCID.Russian,
                //                Alphabets.Map[LCID.Russian].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                //        })
                //},
                //{
                //    LCID.Spanish,
                //    new Language(
                //        (int)LCID.Spanish, "Español", LCID.Spanish,
                //        new[]
                //        {
                //            new AlphabetVariant(
                //                (int)LCID.Spanish, nameof(LCID.Spanish), (int)LCID.Spanish,
                //                Alphabets.Map[LCID.Spanish].ToImmutableDictionary(x => x.Key, x => x.Value.IsUncommon))
                //        })
                //}
            }
            .ToImmutableDictionary();
        }
    }
}