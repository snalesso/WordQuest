using MediatR;

namespace WordQuest.Game.Services;

public class GetAlphabetVariantOptionsQuery : IRequest<IReadOnlyList<AlphabetVariantOption>> { }
