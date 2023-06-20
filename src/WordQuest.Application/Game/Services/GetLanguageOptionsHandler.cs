using MediatR;
using WordQuest.Domain.Persistence;
using WordQuest.Game.Domain;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Services;

public class GetLanguageOptionsHandler : IRequestHandler<GetLanguageOptionsQuery, IReadOnlyList<LanguageOption>>
{
    private readonly IReadOnlyUnitOfWorkFactory<IReadOnlyGameDbConnectionContext> _unitOfWorkFactory;

    public GetLanguageOptionsHandler(IReadOnlyUnitOfWorkFactory<IReadOnlyGameDbConnectionContext> unitOfWorkFactory)
    {
        this._unitOfWorkFactory = unitOfWorkFactory ?? throw new ArgumentNullException(nameof(unitOfWorkFactory));
    }

    public async Task<IReadOnlyList<LanguageOption>> Handle(GetLanguageOptionsQuery request, CancellationToken cancellationToken)
    {
        await using (var uow = await this._unitOfWorkFactory.CreateAsync(cancellationToken))
        {
            return await uow.Context.LanguageOptions.GetAllAsync(cancellationToken);
        }
        //await using var uow = await this._readOnlyUnitOfWorkFactory.CreateAsync(cancellationToken);
        //var items = await uow.LanguageOptions.GetAllAsync(cancellationToken);
        //var dots = items.Select(l => new LanguageOption(l.Id, l.NativeName));

        //return dots.ToArray();
    }
}