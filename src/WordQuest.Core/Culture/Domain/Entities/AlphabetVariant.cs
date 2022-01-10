using System;
using System.Collections.Generic;
using System.Collections.Immutable;

namespace WordQuest.Culture.Domain.Entities
{
    public class AlphabetVariant
    {
        public AlphabetVariant(int id, string nativeName, int languageId, IReadOnlyDictionary<char, bool> charInfos)
        {
            ArgumentNullException.ThrowIfNull(charInfos);
            EmptyEnumerableException.ThrowIfEmpty(charInfos);

            this.Id = id;
            this.LanguageId = languageId;
            this.NativeName = nativeName;
            this.CharInfos = charInfos.ToImmutableDictionary();
        }

        public int Id { get; }
        public string NativeName { get; }
        public int LanguageId { get; }
        public IReadOnlyDictionary<char, bool> CharInfos { get; }
    }
}
