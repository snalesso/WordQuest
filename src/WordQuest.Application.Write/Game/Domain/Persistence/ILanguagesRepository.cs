﻿using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain.Entities;

namespace WordQuest.Game.Domain.Persistence;

public interface ILanguagesRepository : IRepository<Language, short>
{
}
