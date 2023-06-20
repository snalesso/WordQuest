namespace WordQuest.Game.Domain.Persistence;

//public sealed class EfCoreGameDbConnectionContext : IGameDbConnectionContext
//{
//    private readonly EfCoreGameDbContext _dbContext;

//    public EfCoreGameDbConnectionContext(EfCoreGameDbContext dbContext)
//    {
//        this._dbContext = dbContext;
//    }

//    public ILanguagesRepository Languages => throw new NotImplementedException();

//    public IAlphabetVariantsRepository AlphabetVariants => throw new NotImplementedException();

//    public ICategoriesRepository Categories => throw new NotImplementedException();
//}

public sealed class EfCoreGameDbConnectionContext
    : IGameDbConnectionContext
    , IDisposable
    , IAsyncDisposable
{
    // TODO: is MS's DI container able to produce Lazy<T>-s?
    private readonly Lazy<ICategoriesRepository> _categoriesRepositoryLazy;
    private readonly Lazy<IAlphabetVariantsRepository> _alphabetVariantsRepositoryLazy;

    // TODO: create internally using an injected factory
    private readonly EfCoreReadWriteGameDbContext _dbContext;

    public EfCoreGameDbConnectionContext(
        EfCoreReadWriteGameDbContext dbContext
        //, Func<ILanguageOptionsView> getLanguageOptionsView
        //, Func<IAlphabetVariantOptionsView> getAlphabetOptionsView
        //, Func<ICategoryOptionsView> getCategoryOptionsView
        )
    {
        this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        this._categoriesRepositoryLazy = new Lazy<ICategoriesRepository>(
            () => new EfCoreCategoriesRepository(this._dbContext.Categories));
        this._alphabetVariantsRepositoryLazy = new Lazy<IAlphabetVariantsRepository>(
            () => new EfCoreAlphabetVariantsRepository(this._dbContext.AlphabetVariants));
    }

    public ILanguagesRepository Languages => throw new NotImplementedException();

    public IAlphabetVariantsRepository AlphabetVariants =>
        //throw new NotImplementedException();
        this._alphabetVariantsRepositoryLazy.Value;

    public ICategoriesRepository Categories =>
        //throw new NotImplementedException();
        this._categoriesRepositoryLazy.Value;

    #region IDisposable & IAsyncDisposable

    private bool _isDisposed;

    public ValueTask DisposeAsync()
    {
        //throw new NotImplementedException();
        return this._dbContext.DisposeAsync();
        return default;
    }

    // use this in non derived classes
    //protected virtual void Dispose(bool isDisposing)
    // use this in derived classes
    //protected new virtual Dispose(bool isDisposing)
    // use this in sealed classes
    private void Dispose(bool isDisposing)
    {
        if (this._isDisposed)
            return;

        if (isDisposing)
        {
            // TODO: dispose managed state (managed objects)
            //throw new NotImplementedException();
            this._dbContext.Dispose();
        }

        // TODO: free unmanaged resources (unmanaged objects) and override finalizer
        // TODO: set large fields to null
        this._isDisposed = true;
    }

    // // TODO: override finalizer only if 'Dispose(bool isDisposing)' has code to free unmanaged resources
    // ~EFCoreGameUnitOfWork()
    // {
    //     // Do not change this code. Put cleanup code in 'Dispose(bool isDisposing)' method
    //     Dispose(isDisposing: false);
    // }

    public void Dispose()
    {
        // Do not change this code. Put cleanup code in 'Dispose(bool isDisposing)' method
        this.Dispose(isDisposing: true);
        GC.SuppressFinalize(this);
    }

    #endregion
}
