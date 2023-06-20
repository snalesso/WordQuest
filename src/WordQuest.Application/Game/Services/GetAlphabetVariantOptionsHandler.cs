using MediatR;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Services;

public class GetAlphabetVariantOptionsHandler : IRequestHandler<GetAlphabetVariantOptionsQuery, IReadOnlyList<AlphabetVariantOption>>
{
    private readonly IReadOnlyUnitOfWorkFactory<IReadOnlyGameDbConnectionContext> _unitOfWorkFactory;

    public GetAlphabetVariantOptionsHandler(IReadOnlyUnitOfWorkFactory<IReadOnlyGameDbConnectionContext> unitOfWorkFactory)
    {
        this._unitOfWorkFactory = unitOfWorkFactory ?? throw new ArgumentNullException(nameof(unitOfWorkFactory));
    }

    public async Task<IReadOnlyList<AlphabetVariantOption>> Handle(GetAlphabetVariantOptionsQuery request, CancellationToken cancellationToken)
    {
        var x = await this._unitOfWorkFactory.ExecuteAsync(async (context, ct) =>
        {
            var k = await context.AlphabetVariantOptions.GetAllAsync(ct);
            return k;
        }, cancellationToken);
        return x;
    }
}
