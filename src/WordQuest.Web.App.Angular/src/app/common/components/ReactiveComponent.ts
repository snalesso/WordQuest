import { ChangeDetectorRef, Directive, OnDestroy } from "@angular/core";
import { ReactiveObject } from "../components/ReactiveObject";

@Directive()
export abstract class ReactiveComponent
  extends ReactiveObject
  implements OnDestroy {

  constructor(private readonly _cdr: ChangeDetectorRef) { super(); }

  ngOnDestroy(): void {
    this.dispose();
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