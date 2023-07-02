namespace WordQuest.Game.Domain.Entities;

public record ValidatableCategoryWord : CategoryWord
{
    public IDictionary<Guid, bool> PlayersValidationResults { get; init; }
}
