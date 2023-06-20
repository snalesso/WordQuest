namespace WordQuest.Game.Domain.Persistence;

public class InMemoryGameUnitOfWork : IReadOnlyGameDbContext, IGameDbContext
{
    // TODO: is MS's DI container able to produce Lazy<T>-s?
    //private readonly Lazy<ILanguageOptionsView> _lazyLanguageOptionsView;
    //private readonly Lazy<IAlphabetVariantOptionsView> _lazyAlphabetOptionsView;
    //private readonly Lazy<ICategoryOptionsView> _lazyCategoriesRepository;

    #region ctors

    //public InMemoryGameUnitOfWork(
    //    Func<ILanguageOptionsView> getLanguagesRepository,
    //    Func<IAlphabetVariantOptionsView> getAlphabetsRepository,
    //    Func<ICategoryOptionsView> getCategoriesRepository)
    //{
    //    this._lazyLanguageOptionsView = new Lazy<ILanguageOptionsView>(getLanguagesRepository);
    //    this._lazyAlphabetOptionsView = new Lazy<IAlphabetVariantOptionsView>(getAlphabetsRepository);
    //    this._lazyCategoriesRepository = new Lazy<ICategoryOptionsView>(getCategoriesRepository);
    //}

    public InMemoryGameUnitOfWork() { }

    #endregion

    #region Read/Write

    public ILanguagesRepository Languages => throw new NotImplementedException();

    public IAlphabetVariantsRepository AlphabetVariants => throw new NotImplementedException();

    public ICategoriesRepository Categories => throw new NotImplementedException();

    #endregion

    #region views

    public ILanguageOptionsView LanguageOptions { get; } = new InMemoryLanguageOptionsView();

    public IAlphabetVariantOptionsView AlphabetVariantOptions { get; } = new InMemoryAlphabetVariantOptionsView();

    public ICategoryOptionsView CategoryOptions { get; } = new InMemoryCategoryOptionsView();

    #endregion

    #region transaction methods

    public Task CommitAsync(CancellationToken cancellationToken = default) => Task.CompletedTask;

    public Task RollbackAsync(CancellationToken cancellationToken = default)
    {
        throw new NotSupportedException();
    }

    #endregion

    #region IDisposable & IAsyncDisposable

    private bool disposedValue;

    public async ValueTask DisposeAsync()
    {
        await this.DisposeAsyncCore().ConfigureAwait(false);

        this.Dispose(disposing: false);
#pragma warning disable CA1816 // Dispose methods should call SuppressFinalize
        GC.SuppressFinalize(this);
#pragma warning restore CA1816 // Dispose methods should call SuppressFinalize
    }

    protected virtual ValueTask DisposeAsyncCore()
    {
        // dispose managed state here

        return ValueTask.CompletedTask;
    }

    protected virtual void Dispose(bool disposing)
    {
        if (this.disposedValue)
            return;

        if (disposing)
        {
            // TODO: dispose managed state (managed objects)
        }

        // TODO: free unmanaged resources (unmanaged objects) and override finalizer
        // TODO: set large fields to null
        this.disposedValue = true;
    }

    // // TODO: override finalizer only if 'Dispose(bool disposing)' has code to free unmanaged resources
    // ~EFCoreGameUnitOfWork()
    // {
    //     // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
    //     Dispose(disposing: false);
    // }

    public void Dispose()
    {
        // Do not change this code. Put cleanup code in 'Dispose(bool disposing)' method
        this.Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }

    #endregion
}
