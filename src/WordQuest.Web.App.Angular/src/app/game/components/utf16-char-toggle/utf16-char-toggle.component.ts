import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { ISelectable } from 'src/app/root/models/core';
import { Char } from 'src/app/root/models/culture.DTOs';

@Component({
  selector: 'app-utf16-char-toggle',
  templateUrl: './utf16-char-toggle.component.html',
  styleUrls: ['./utf16-char-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Utf16CharToggleComponent extends ReactiveComponent {

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  @Input()
  public selectableChar: ISelectable<Char> | undefined;

  @Input()
  public char: Char | undefined;

  private readonly _isSelected$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Output()
  public readonly isSelected$ = this._isSelected$$.asObservable();
  @Input()
  public get isSelected() { return this._isSelected$$.value; }
  public set isSelected(value) { this._isSelected$$.next(value); }
}
