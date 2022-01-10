using System;
using System.Collections.Generic;

namespace WordQuest.Culture.Domain.Entities
{
    public class Language
    {
        public Language(
            int id,
            string nativeName,
            LCID lCID,
            //string iSO_639_1,
            //string iSO_639_2B,
            //string iSO_639_2T,
            //string iSO_639_3,
            IReadOnlyList<AlphabetVariant> alphabetVariants)
        {
            this.Id = id;
            this.NativeName = nativeName ?? throw new ArgumentNullException(nameof(nativeName));
            this.LCID = lCID;
            //this.ISO_639_1 = iSO_639_1 ?? throw new ArgumentNullException(nameof(iSO_639_1));
            //this.ISO_639_2B = iSO_639_2B ?? throw new ArgumentNullException(nameof(iSO_639_2B));
            //this.ISO_639_2T = iSO_639_2T ?? throw new ArgumentNullException(nameof(iSO_639_2T));
            //this.ISO_639_3 = iSO_639_3 ?? throw new ArgumentNullException(nameof(iSO_639_3));
            ArgumentNullException.ThrowIfNull(alphabetVariants);
            EmptyEnumerableException.ThrowIfEmpty(alphabetVariants);
            this.AlphabetVariants = alphabetVariants;
        }

        public int Id { get; private init; }

        public string NativeName { get; init; }

        public LCID LCID { get; private init; }
        // various ISOs, at a future point one of these will be chosen
        //public string ISO_639_1 { get; private init; }
        //public string ISO_639_2B { get; private init; }
        //public string ISO_639_2T { get; private init; }
        //public string ISO_639_3 { get; private init; }

        public IReadOnlyList<AlphabetVariant> AlphabetVariants { get; private init; }
    }
}
