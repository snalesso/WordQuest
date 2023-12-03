namespace WordQuest.Game.Domain;

public record ValidatableCategoryWord : CategoryWord
{
    public IDictionary<Guid, bool> PlayersValidationResults { get; init; }
}
