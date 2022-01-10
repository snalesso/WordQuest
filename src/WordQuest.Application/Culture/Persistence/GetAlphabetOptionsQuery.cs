using MediatR;
using WordQuest.Culture.DTOs;

namespace WordQuest.Culture.Persistence;

public class GetAlphabetOptionsQuery : IRequest<IReadOnlyList<AlphabetOption>> { }
