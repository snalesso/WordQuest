using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

internal class InMemoryDatabase
{
    private InMemoryDatabase()
    {
        var alphabetVariants = new List<AlphabetVariant>
        {
            new AlphabetVariant(Languages.Italian, Alphabets.Italian, 0),
            new AlphabetVariant(Languages.English, Alphabets.English, 0),
            new AlphabetVariant(Languages.Spanish, Alphabets.Spanish, 0),
            new AlphabetVariant(Languages.German, Alphabets.German, 0),
            new AlphabetVariant(Languages.French, Alphabets.French, 0),
            new AlphabetVariant(Languages.Russian, Alphabets.Russian, 0),
        };
    }

    public static InMemoryDatabase Instance { get; } = new();
}
