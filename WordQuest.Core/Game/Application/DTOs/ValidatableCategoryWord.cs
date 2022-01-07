using System;
using System.Collections.Generic;

namespace WordQuest.Game.Application.DTOs
{
    public record ValidatableCategoryWord : CategoryWord
    {
        public IDictionary<Guid, bool> PlayersValidationResults { get; init; }
    }
}
