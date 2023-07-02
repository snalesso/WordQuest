using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public class InMemoryAlphabetVariantOptionsView : IAlphabetVariantOptionsView
{
    private readonly IReadOnlyList<AlphabetVariantOption> _alphabetVariantOptions = CreateCollection();

    public Task<IReadOnlyList<AlphabetVariantOption>> GetAllAsync(CancellationToken cancellationToken)
    {
        return Task.FromResult(this._alphabetVariantOptions);
    }

    public Task<IReadOnlyList<AlphabetVariantOption>> GetAllAsync(ushort languageId, CancellationToken cancellationToken = default)
    {
        //if (!Alphabets.Map.TryGetValue(lcid, out var alphabets)
        //    || alphabets is null
        //    || !alphabets.Any())
        //    throw new KeyNotFoundException($"No alphabets associated with language {lcid}.");

        if (!Languages.Map.TryGetValue(languageId, out var languaage)
            || languaage is null)
            throw new KeyNotFoundException($"Language with ID = {languageId} not found.");

        var result = this._alphabetVariantOptions
            .Where(x => x.Language.Id == languageId)
            .ToArray();

        return Task.FromResult<IReadOnlyList<AlphabetVariantOption>>(result);
    }

    public Task<AlphabetVariantOption> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    private static IReadOnlyList<AlphabetVariantOption> CreateCollection()
    {
        var items = new List<AlphabetVariantOption>
        {
            new AlphabetVariantOption(new(), new(Languages.Italian.Id, Languages.Italian.NativeName), Alphabets.Italian),
            new AlphabetVariantOption(new(), new(Languages.English.Id, Languages.English.NativeName), Alphabets.English),
            new AlphabetVariantOption(new(), new(Languages.Spanish.Id, Languages.Spanish.NativeName), Alphabets.Spanish),
            new AlphabetVariantOption(new(), new(Languages.German.Id, Languages.German.NativeName), Alphabets.German),
            new AlphabetVariantOption(new(), new(Languages.French.Id, Languages.French.NativeName), Alphabets.French),
            new AlphabetVariantOption(new(), new(Languages.Russian.Id, Languages.Russian.NativeName), Alphabets.Russian)
        };

        return items;
    }

    public Task<IReadOnlyList<AlphabetVariantOption>> GetAllAsync(short languageId, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}