using MediatR;
using WordQuest.Domain.Persistence;
using WordQuest.Culture.DTOs;
using WordQuest.Game.Persistence;

namespace WordQuest.Culture.Persistence;

public class GetLanguageOptionsHandler : IRequestHandler<GetLanguageOptionsQuery, IReadOnlyList<LanguageOption>>
{
    private readonly IUnitOfWorkFactory<IGameUnitOfWork> _unitOfWorkFactory;

    public GetLanguageOptionsHandler(IUnitOfWorkFactory<IGameUnitOfWork> unitOfWorkFactory)
    {
        this._unitOfWorkFactory = unitOfWorkFactory ?? throw new ArgumentNullException(nameof(unitOfWorkFactory));
    }

    public async Task<IReadOnlyList<LanguageOption>> Handle(GetLanguageOptionsQuery request, CancellationToken cancellationToken)
    {
        await using var uow = await this._unitOfWorkFactory.CreateAsync(cancellationToken);
        var items = await uow.Languages.GetAllAsync();
        var dots = items.Select(l => new LanguageOption(l.Id, l.NativeName));

        return dots.ToArray();
    }
}