import { ChangeDetectorRef, Component, Directive, Injectable, OnDestroy } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Observable, Observer, PartialObserver, Subscription } from "rxjs";

// @Injectable()
// @Directive()
@Component({ template: '' })
export class ReactiveComponent implements OnDestroy {

  private _subscriptions: Subscription[];
  fewfaw: AbstractControl;

  constructor(private readonly _changeDetectorRef: ChangeDetectorRef) { }

  protected markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }

  protected detectChanges(): void {
    this._changeDetectorRef.detectChanges();
  }

  protected subscribe<T>(
    sourceOrSubs: Observable<T> | Subscription[] | Subscription,
    observer?: PartialObserver<T>) {

    this._subscriptions ??= [];

    if (sourceOrSubs instanceof Observable) {
      const sub = !!observer
        ? sourceOrSubs.subscribe(observer)
        : sourceOrSubs.subscribe();
      this._subscriptions.push(sub);
    }
    else if (sourceOrSubs instanceof Array) {
      this._subscriptions.push(...sourceOrSubs);
    }
    else if (sourceOrSubs instanceof Subscription) {
      this._subscriptions.push(sourceOrSubs);
    }
  }

  private unsubscribeBackwards(): void {

    if (!this._subscriptions)
      return;

    for (let i = (this._subscriptions.length - 1); i >= 0; i--) {
      const sub = this._subscriptions[i];
      sub.unsubscribe();
    }
    // for (const sub of this._subscriptions) {
    //   sub.unsubscribe();
    // }
  }

  ngOnDestroy(): void {

    this.unsubscribeBackwards();
    this._subscriptions = null;
  }

}