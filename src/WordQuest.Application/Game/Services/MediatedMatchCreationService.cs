using MediatR;
using WordQuest.Culture.DTOs;
using WordQuest.Culture.Persistence;
using WordQuest.Game.DTOs;

namespace WordQuest.Game.Services;

public class MediatedMatchCreationService : IMatchCreationService
{
    private readonly IMediator _mediator;

    public MediatedMatchCreationService(IMediator mediator)
    {
        this._mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
    }

    public Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<AlphabetInfo>> GetAlphabetVariantsAsync(int languageId, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<LanguageOption>> GetLanguageOptionsAsync(CancellationToken cancellationToken = default) =>
        this._mediator.Send(new GetLanguageOptionsQuery(), cancellationToken);

    public Task<IReadOnlyList<Category>> GetRandomCategories(int alphabetId, ushort count, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
