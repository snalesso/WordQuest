using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Culture.Domain.Persistence
{
    public class InMemoryAlphabetsRepository : IAlphabetsRepository
    {
        public Task<IEnumerable<AlphabetVariant>> GetAllAsync(CancellationToken cancellationToken)
        {
            var languagesMap = Languages.Map;
            var alphabets = languagesMap.SelectMany(l => l.Value.AlphabetVariants);
            return Task.FromResult(alphabets);
        }

        public Task<IEnumerable<AlphabetVariant>> GetAsync(LCID lcid, CancellationToken cancellationToken = default)
        {
            //if (!Alphabets.Map.TryGetValue(lcid, out var alphabets)
            //    || alphabets is null
            //    || !alphabets.Any())
            //    throw new KeyNotFoundException($"No alphabets associated with language {lcid}.");

            if (!Languages.Map.TryGetValue(lcid, out var languaage)
                || languaage is null)
                throw new KeyNotFoundException($"Language {lcid} not found.");

            return Task.FromResult(languaage.AlphabetVariants.AsEnumerable());
        }
    }
}