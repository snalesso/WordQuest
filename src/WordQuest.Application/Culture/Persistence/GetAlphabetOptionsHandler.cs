using MediatR;
using WordQuest.Domain.Persistence;
using WordQuest.Culture.DTOs;
using WordQuest.Game.Persistence;
using WordQuest.Culture.Domain.Entities;

namespace WordQuest.Culture.Persistence;

public class GetAlphabetOptionsHandler : IRequestHandler<GetAlphabetOptionsQuery, IReadOnlyList<AlphabetOption>>
{
    private readonly IUnitOfWorkFactory<IGameUnitOfWork> _unitOfWorkFactory;

    public GetAlphabetOptionsHandler(IUnitOfWorkFactory<IGameUnitOfWork> unitOfWorkFactory)
    {
        this._unitOfWorkFactory = unitOfWorkFactory ?? throw new ArgumentNullException(nameof(unitOfWorkFactory));
    }

    public async Task<IReadOnlyList<AlphabetOption>> Handle(GetAlphabetOptionsQuery request, CancellationToken cancellationToken)
    {
        IEnumerable<AlphabetVariant> alphabets;
        await using (IGameUnitOfWork uow = await this._unitOfWorkFactory.CreateAsync(cancellationToken))
        {
            alphabets = await uow.Alphabets.GetAllAsync(cancellationToken);
        }
        return alphabets
            .Select(a => new AlphabetOption(a.Id, a.NativeName, a.CharInfos.Select(ci => new DTOs.CharInfo(ci.Key, ci.Value))))
            .ToArray();
    }
}