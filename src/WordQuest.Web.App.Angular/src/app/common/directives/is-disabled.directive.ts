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

    if (value == false)
      element.disabled = undefined as any as boolean;
    else
      element.disabled = true;
  }

  constructor(private readonly _htmlSelectElem: ElementRef<HTMLDisableableElement>) {
    // TODO: validate nil?
  }

}