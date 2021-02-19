using WordQuest.Culture.Domain;
using WordQuest.Web.DTOs;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WordQuest.Web.Data
{
    public static class FakeApi
    {
        public static IDictionary<LCID, Language> GetLanguages()
        {
            var langs = new[]
            {
                new Language() { LCID = LCID.Italian, NativeName = "Italiano" },
                new Language() { LCID = LCID.English, NativeName = "English" },
                new Language() { LCID = LCID.German, NativeName = "Deutsch" },
                new Language() { LCID = LCID.French, NativeName = "Français" },
                new Language() { LCID = LCID.Russian, NativeName = "Русский" },
                new Language() { LCID = LCID.Spanish, NativeName = "Español" }
            }
            .ToDictionary(x => x.LCID, x => x);

            return langs;
        }

        public static IDictionary<LCID, IDictionary<char, CharInfo>> GetLanguageCharInfos()
        {
            return new Dictionary<LCID, IDictionary<char, CharInfo>>()
            {
                [LCID.English] = CharsHelper.InfosOf(65, 90),
                [LCID.Italian] = CharsHelper.InfosOf(65, 90,
                    exclusions: new[] { 'J', 'K', 'W', 'X', 'Y' }.ToHashSet(),
                    uncommons: new[] { 'H', 'Q' }.ToHashSet()),
                [LCID.Russian] = CharsHelper.InfosOf(1040, 1071)
            };
        }
    }
}
