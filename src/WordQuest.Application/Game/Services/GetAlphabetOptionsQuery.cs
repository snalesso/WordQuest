using MediatR;
using WordQuest.Game.Domain;

namespace WordQuest.Game.Services;

public class GetAlphabetOptionsQuery : IRequest<IReadOnlyList<AlphabetOption>> { }
