import { ChangeDetectorRef, Directive, OnDestroy, Output } from "@angular/core";
import { Observable, PartialObserver, Subject, isObservable } from "rxjs";
import { takeUntil } from "rxjs/operators";

// TODO: rename file
@Directive()
export abstract class ReactiveComponent implements OnDestroy {

  private readonly _destructionTrigger$$ = new Subject<void>();
  @Output()
  public readonly destructionTrigger$ = this._destructionTrigger$$.asObservable();

  constructor(private readonly _cdr: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    this._destructionTrigger$$.next();
  }

  protected subscribe<T>(observable: Observable<T>): void;
  protected subscribe<T>(observables: Observable<T>[]): void;
  protected subscribe(observables: Observable<unknown>[]): void;
  protected subscribe<T>(observable: Observable<T>, observer?: PartialObserver<T>): void;
  protected subscribe<T>(observables: Observable<T>[], observer?: PartialObserver<T>): void;
  protected subscribe(observables: Observable<unknown>[], observer?: PartialObserver<unknown>): void;
  protected subscribe<T>(oneOrManyObservables: Observable<T> | Observable<T>[], observer?: PartialObserver<T>): void {

    if (oneOrManyObservables == null)
      throw new Error('Observable/s not defined.');

    if (isObservable(oneOrManyObservables)) {
      oneOrManyObservables.pipe(takeUntil(this.destructionTrigger$)).subscribe(observer);
      return;
    }
    if (oneOrManyObservables instanceof Array) {
      for (const observable of oneOrManyObservables) {
        this.subscribe(observable, observer);
      }
      return;
    }
    throw new Error('Unsupported type.');
  }

  protected markForCheck(): void {
    this._cdr.markForCheck();
  }
  protected detectChanges(): void {
    this._cdr.detectChanges();
  }
  protected detectLocalChanges(): void {
    this._cdr.detach();
    this._cdr.detectChanges();
    this._cdr.reattach();
  }
}