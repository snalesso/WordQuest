using System;
using System.Collections.Generic;

namespace WordQuest.Culture.Domain.Entities
{
    public class SymbolsGroup
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public IReadOnlySet<char> Chars_UTF16 { get; set; }
        public Range<char> Chars_UTF16_generator { get; set; }
    }
}
