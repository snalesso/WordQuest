import { Directive, ElementRef, Input } from '@angular/core';
import { HTMLDisableableElement } from '../model/presentation';

const DIRECTIVE_NAME: string = "appIsEnabled";

@Directive({
  selector: `[${DIRECTIVE_NAME}]`
})
export class IsEnabledDirective {

  @Input(DIRECTIVE_NAME)
  public set isEnabled(isEnabled: boolean) {
    const element = this._htmlSelectElem.nativeElement;
    if (element === undefined || element === null)
      throw new Error('HTML element not available.');

    element.disabled = isEnabled ? false : true;
    // if (isEnabled == true)
    //   element.removeAttribute('disabled');
    // else
    //   element.setAttribute('disabled', '');
  }

  constructor(private readonly _htmlSelectElem: ElementRef<HTMLDisableableElement>) {
    // TODO: validate nil?
  }

}