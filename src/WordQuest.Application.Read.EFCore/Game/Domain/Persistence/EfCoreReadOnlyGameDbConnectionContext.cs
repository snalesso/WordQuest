namespace WordQuest.Game.Domain.Persistence;

public sealed class EfCoreReadOnlyGameDbConnectionContext
    : IReadOnlyGameDbConnectionContext
    , IDisposable
    , IAsyncDisposable
{
    // TODO: is MS's DI container able to produce Lazy<T>-s?
    private readonly Lazy<EfCoreLanguageOptionsView> _lazyLanguageOptionsView;
    private readonly Lazy<EfCoreAlphabetVariantOptionsView> _lazyAlphabetVariantOptionsView;
    private readonly Lazy<EfCoreCategoryOptionsView> _lazyCategoryOptionsView;

    // TODO: create internally using an injected factory
    // TODO: is there a way to scaffold a read-only version of a db-context? (readonly IDbSet API?)
    private readonly EfCoreReadOnlyGameDbContext _dbContext;

    public EfCoreReadOnlyGameDbConnectionContext(
        EfCoreReadOnlyGameDbContext dbContext
        //, Func<ILanguageOptionsView> getLanguageOptionsView
        //, Func<IAlphabetVariantOptionsView> getAlphabetOptionsView
        //, Func<ICategoryOptionsView> getCategoryOptionsView
        )
    {
        this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        this._lazyLanguageOptionsView = new Lazy<EfCoreLanguageOptionsView>(
            () => new EfCoreLanguageOptionsView(this._dbContext.Languages));
        this._lazyAlphabetVariantOptionsView = new Lazy<EfCoreAlphabetVariantOptionsView>(
            () => new EfCoreAlphabetVariantOptionsView(
                this._dbContext.AlphabetVariants,
                this._dbContext.LanguageAlphabets,
                this._dbContext.Languages));
        this._lazyCategoryOptionsView = new Lazy<EfCoreCategoryOptionsView>(
            () => new EfCoreCategoryOptionsView(this._dbContext.Categories));
    }

    public ILanguageOptionsView LanguageOptions =>
        //throw new NotImplementedException();
        this._lazyLanguageOptionsView.Value;

    public IAlphabetVariantOptionsView AlphabetVariantOptions =>
        //throw new NotImplementedException();
        this._lazyAlphabetVariantOptionsView.Value;

    public ICategoryOptionsView CategoryOptions =>
        //throw new NotImplementedException();
        this._lazyCategoryOptionsView.Value;

    #region IDisposable & IAsyncDisposable

    private bool disposedValue;

    public ValueTask DisposeAsync()
    {
        //throw new NotImplementedException();
        return this._dbContext.DisposeAsync();
        return default;
    }

    // use this in non derived classes
    //protected virtual void Dispose(bool disposing)
    // use this in derived classes
    //protected new virtual Dispose(bool disposing)
    // use this in sealed classes
    private void Dispose(bool disposing)
    {
        if (this.disposedValue)
            return;

        if (disposing)
        {
            // TODO: dispose managed state (managed objects)
            //throw new NotImplementedException();
            this._dbContext.Dispose();
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
