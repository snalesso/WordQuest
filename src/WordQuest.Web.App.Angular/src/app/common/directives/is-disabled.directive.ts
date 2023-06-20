import { Directive, ElementRef, Input } from '@angular/core';
import { HTMLDisableableElement } from '../model/presentation';

const DIRECTIVE_NAME: string = "appIsDisabled";

@Directive({
  selector: `[${DIRECTIVE_NAME}]`
})
export class IsDisabledDirective {

  @Input(DIRECTIVE_NAME)
  public set isDisabiled(isDisabled: boolean) {
    const element = this._htmlSelectElem.nativeElement;
    if (element === undefined || element === null)
      return;

    // TODO: is this workaround accepted
    element.disabled = isDisabled ? true : undefined as any as boolean;
  }

  constructor(private readonly _htmlSelectElem: ElementRef<HTMLDisableableElement>) {
    // TODO: validate nil?
  }

}