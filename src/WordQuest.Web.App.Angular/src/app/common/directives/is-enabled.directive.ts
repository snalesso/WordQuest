import { Directive, ElementRef, Input } from '@angular/core';
import { HTMLDisableableElement } from '../model/presentation';

const DIRECTIVE_NAME: string = "appIsEnabled";

@Directive({
  selector: `[${DIRECTIVE_NAME}]`
})
export class IsEnabledDirective {

  @Input(DIRECTIVE_NAME)
  public set isEnabled(value: boolean) {
    const element = this._htmlSelectElem.nativeElement;
    if (element === undefined || element === null)
      return;

    // TODO: is this workaround accepted
    element.disabled = value ? undefined as any as boolean : true;
  }

  constructor(private readonly _htmlSelectElem: ElementRef<HTMLDisableableElement>) {
    // TODO: validate nil?
  }

}