import { Directive, ElementRef, Input } from '@angular/core';
import { HTMLDisableableElement } from '../model/presentation';

const DIRECTIVE_NAME: string = "isDisabled";

@Directive({
  selector: `[${DIRECTIVE_NAME}]`
})
export class IsDisabledDirective {

  @Input(DIRECTIVE_NAME)
  public set isDisabiled(value: boolean) {
    const element = this._htmlSelectElem.nativeElement;
    if (element === undefined || element === null)
      throw new Error('HTML element not available.');

    if (value == true)
      element.setAttribute('disabled', '');
    else
      element.removeAttribute('disabled');
  }

  constructor(private readonly _htmlSelectElem: ElementRef<HTMLDisableableElement>) {
    // TODO: validate nil?
  }

}