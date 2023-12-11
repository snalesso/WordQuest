import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Char } from 'src/app/navigation/models/culture.DTOs';
import { ReactiveComponent } from 'src/app/shared/components/ReactiveComponent';

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

  @Input() public char: Char | undefined;

  private readonly _isSelected$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Output() public readonly isSelected$ = this._isSelected$$.asObservable();
  @Input() public get isSelected() { return this._isSelected$$.value; }
  public set isSelected(value) { this._isSelected$$.next(value); }
}
