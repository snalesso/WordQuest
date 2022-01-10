using System.Collections.Immutable;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public class InMemoryCategoriesRepository : ICategoriesRepository
{
    public Task<IReadOnlyList<Category>> GetAllAsync(int languageId, CancellationToken cancellationToken = default)
    {
        int i = 1;
        var categoryNames = new[]
        {
            "cities",
            "animals",
            "person names",
            "elements and compounds",
            "mithology",
            "hobbies",
            "adjectives",
            "plants, flowers & fruits",
            "war weapons",
            "Pokémon",
            "Pokémon spells",
            "League of Legends' champions",
            "hobbies",
            "diseases",
            "alcoholics",
            "capitals",
            "rivers & lakes",
            "mountains & ranges",
            "sex quotes",
            "ways to die",
            "soccer players",
            "movies",
            "cartoons",
            "food brands",
            "superheroes",
            "precious gems",
            "books",
            "songs",
            "languages",
            "countries",
            "movie stars",
            "4 letters words",
            "home objects",
            "jobs",
            "singers & bands",
            "vehicles"
        }
        .Select(c => new Category()
        {
            Id = (languageId * 1000) + i++,
            Name = c,
            LanguageId = languageId,
            Description = $"faewfwaefw",
            IsCustom = false,
            TagIds = ImmutableHashSet<int>.Empty
        })
        .ToArray();

        return Task.FromResult<IReadOnlyList<Category>>(categoryNames);
    }

    public Task<Category> GetAsync(int id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
