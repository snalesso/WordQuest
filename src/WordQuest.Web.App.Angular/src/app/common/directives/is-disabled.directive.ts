import { Directive, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { HTMLDisableableElement } from '../model/presentation';

const DIRECTIVE_NAME: string = "appIsDisabled";

@Directive({
  selector: `[${DIRECTIVE_NAME}]`
})
export class IsDisabledDirective {

  @Input(DIRECTIVE_NAME)
  public set IsDisabiled(isDisabled: boolean) {
    if (!this._htmlSelectElem.nativeElement)
      return;

    this._htmlSelectElem.nativeElement.disabled = isDisabled ? true : null;
  }

  constructor(private readonly _htmlSelectElem: ElementRef<HTMLDisableableElement>) { }

}