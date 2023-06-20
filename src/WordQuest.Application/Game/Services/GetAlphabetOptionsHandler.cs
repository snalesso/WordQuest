using MediatR;
using WordQuest.Game.Domain;

namespace WordQuest.Game.Services;

public class GetAlphabetOptionsHandler : IRequestHandler<GetAlphabetOptionsQuery, IReadOnlyList<AlphabetOption>>
{
    public GetAlphabetOptionsHandler()
    {
    }

    public async Task<IReadOnlyList<AlphabetOption>> Handle(GetAlphabetOptionsQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}