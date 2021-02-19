import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { MatchSettingsDto, CategoryDto } from 'src/app/game/models/game.DTOs';

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
    public matchSettings: MatchSettingsDto | null = null;

    @Input()
    public category: CategoryDto | null = null;

    private _isEditable: boolean = false;
    public get isEditable(): boolean { return this._isEditable; }

    public handleKeyDown(e: KeyboardEvent) {

        e.preventDefault();
        console.log((this.category?.name ?? "<CATEGORY>") + "." + (e.currentTarget) + " -> " + e.key);
    }

}
