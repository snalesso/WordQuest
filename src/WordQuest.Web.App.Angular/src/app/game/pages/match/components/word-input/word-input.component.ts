import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { Category, MatchSettings } from 'src/app/game/models/game.DTOs';

@Component({
    selector: 'app-word-input',
    templateUrl: './word-input.component.html',
    styleUrls: ['./word-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordInputComponent extends ReactiveComponent {

    // TODO: can we pass category & other readonly's here??
    constructor(
        changeDetectorRef: ChangeDetectorRef) {

        super(changeDetectorRef);
    }

    @Input()
    public matchSettings: MatchSettings | null = null;

    @Input()
    public category: Category | null = null;

    private _isEditable: boolean = false;
    public get isEditable(): boolean { return this._isEditable; }

    public handleKeyDown(e: KeyboardEvent) {

        e.preventDefault();
        console.log((this.category?.name ?? "<CATEGORY>") + "." + (e.currentTarget) + " -> " + e.key);
    }

}
