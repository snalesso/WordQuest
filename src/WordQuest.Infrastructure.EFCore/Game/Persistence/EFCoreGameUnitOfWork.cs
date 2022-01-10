using WordQuest.Culture.Domain.Persistence;
using WordQuest.Game.Domain.Persistence;

namespace WordQuest.Game.Persistence
{
    public class EFCoreGameUnitOfWork : IGameUnitOfWork
    {
        // TODO: is MS's DI container able to produce Lazy<T>-s?
        private readonly Lazy<ILanguagesRepository> _lazyLanguagesRepository;
        private readonly Lazy<IAlphabetsRepository> _lazyAlphabetsRepository;
        private readonly Lazy<ICategoriesRepository> _lazyCategoriesRepository;
        private readonly WordQuestDBContext context;

        public EFCoreGameUnitOfWork(
            WordQuestDBContext context,
            Func<ILanguagesRepository> getLanguagesRepository,
            Func<IAlphabetsRepository> getAlphabetsRepository,
            Func<ICategoriesRepository> getCategoriesRepository)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
            this._lazyLanguagesRepository = new Lazy<ILanguagesRepository>(getLanguagesRepository);
            this._lazyAlphabetsRepository = new Lazy<IAlphabetsRepository>(getAlphabetsRepository);
            this._lazyCategoriesRepository = new Lazy<ICategoriesRepository>(getCategoriesRepository);
        }

        public ILanguagesRepository Languages => this._lazyLanguagesRepository.Value;
        public IAlphabetsRepository Alphabets => this._lazyAlphabetsRepository.Value;
        public ICategoriesRepository Categories => this._lazyCategoriesRepository.Value;

        public Task CommitAsync()
        {
            throw new NotImplementedException();
        }

        #region IDisposable & IAsyncDisposable

        private bool disposedValue;

        public ValueTask DisposeAsync()
        {
            throw new NotImplementedException();
        }

        public Task RollbackAsync()
        {
            throw new NotImplementedException();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposedValue)
                return;

            if (disposing)
            {
                // TODO: dispose managed state (managed objects)
            }

            // TODO: free unmanaged resources (unmanaged objects) and override finalizer
            // TODO: set large fields to null
            disposedValue = true;
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
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
