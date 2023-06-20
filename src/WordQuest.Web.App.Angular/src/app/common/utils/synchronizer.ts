import { Injectable, Output } from '@angular/core';
import { BehaviorSubject, defer, Observable, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Injectable()
export class Synchronizer<TService> {

    constructor(private readonly _svc: TService) { }

    public execute<TResult>(action: (svc: TService) => Observable<TResult>) {
        return defer(() => {

            if (this.isExecuting)
                return throwError('Another action is executing.');

            this.setIsExecuting(true);

            const svcCall$ = action(this._svc);
            return svcCall$.pipe(finalize(() => this._isExecuting$$.next(false)))
        })
    }

    private readonly _isExecuting$$ = new BehaviorSubject<boolean>(false);
    @Output()
    public readonly isExecuting$ = this._isExecuting$$.asObservable();
    public get isExecuting() { return this._isExecuting$$.value; }
    private setIsExecuting(value: boolean) { this._isExecuting$$.next(value); }
}