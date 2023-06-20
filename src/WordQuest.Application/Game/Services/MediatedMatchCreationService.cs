using MediatR;
using WordQuest.Culture.DTOs;

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

    public Task<IReadOnlyList<CategoryOption>> GetRandomCategories(int alphabetId, ushort count, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyList<AlphabetVariantOption>> GetAlphabetVariantOptionsAsync(CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
