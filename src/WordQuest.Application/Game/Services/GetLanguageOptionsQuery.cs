using MediatR;
using WordQuest.Game.Domain;

namespace WordQuest.Game.Services;

public class GetLanguageOptionsQuery : IRequest<IReadOnlyList<LanguageOption>> { }
