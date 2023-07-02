using System.Collections.Specialized;
using System.Diagnostics.CodeAnalysis;

namespace WordQuest;

public static class NameValueCollectionExtensions
{
    public static bool TryGetValue(this NameValueCollection nameValueCollection, string key, [NotNullWhen(true)] out string? value)
    {
        value = nameValueCollection.Get(key);
        return value is not null;
    }
}