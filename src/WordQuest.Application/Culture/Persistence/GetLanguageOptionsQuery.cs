using MediatR;
using WordQuest.Culture.DTOs;

namespace WordQuest.Culture.Persistence;

public class GetLanguageOptionsQuery : IRequest<IReadOnlyList<LanguageOption>> { }
