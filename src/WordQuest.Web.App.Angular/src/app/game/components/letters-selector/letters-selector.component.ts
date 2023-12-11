import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, map, startWith } from 'rxjs/operators';
import { ItemsListBaseComponent } from 'src/app/common/components/items-list-base.component';
import { DialogService } from 'src/app/common/services/dialog.service';
import { LoggingService } from 'src/app/common/services/logging.service';
import { NotificationsService } from 'src/app/common/services/notifications.service';
import { shareReplayChangeLog } from 'src/app/common/utils/debug/rxjs';
import { tapOnSub } from 'src/app/common/utils/rxjs.utils';
import { storeIn } from 'src/app/common/utils/rxjs/rxjs.utils';
import { randomInt } from 'src/app/root/models/core';
import { AlphabetVariant, Char } from 'src/app/root/models/culture.DTOs';
import { generateNumbers } from 'src/app/root/models/utils';
import { GameService } from '../../services/game.service';

export interface ILettersCriteria {
    readonly alphabetVariantId: AlphabetVariant['id'];
}

@Component({
    selector: 'app-letters-selector',
    templateUrl: './letters-selector.component.html',
    styleUrls: ['./letters-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LettersSelectorComponent
    extends ItemsListBaseComponent<Char, Char, undefined, ILettersCriteria | undefined>
    implements OnInit {

    protected override getIdentityFromItem(listItem: Char): Char {
        return listItem;
    }

    protected readonly loadingPlaceholders = generateNumbers(1, 30).map(() => generateNumbers(1, randomInt(3, 12)).join(''));

    private readonly _alphabetVariantId$$ = new BehaviorSubject<AlphabetVariant['id'] | undefined>(undefined);
    public get alphabetVariantId() { return this._alphabetVariantId$$.value; }
    @Input() public set alphabetVariantId(value) { this._alphabetVariantId$$.next(value); }
    @Output() public readonly alphabetVariantId$ = this._alphabetVariantId$$.pipe(distinctUntilChanged());

    // private readonly _alphabetChars$$ = new BehaviorSubject<ReadonlyMap<Char, CharMetadata> | undefined>(undefined);
    // public get alphabetChars() { return this._alphabetChars$$.value; }
    // @Output() public readonly alphabetChars$ = this.alphabetVariantId$.pipe(
    //     switchMap(alphabetVariantId => {
    //         if (alphabetVariantId == null)
    //             return of(undefined);
    //         return this._gameSvc.getAlphabetVariantCharOptionsAsync(alphabetVariantId).pipe(
    //             tapOnSub(() => this.isLoading = true),
    //             catchError(() => of(undefined)),
    //             startWith(undefined),
    //             finalize(() => this.isLoading = false));
    //     }),
    //     storeIn(() => this._alphabetChars$$),
    //     shareReplayChangeLog(this, value => {
    //         return 'alphabetChars';
    //     }));

    private readonly _selectedCharSet$$ = new BehaviorSubject<ReadonlySet<Char> | undefined>(undefined);
    public get selectedCharSet() { return this._selectedCharSet$$.value; }
    @Output() public readonly selectedCharSet$ = this.selectedItems$.pipe(
        map(selectedItems => selectedItems == null ? undefined : new Set(selectedItems)),
        storeIn(() => this._selectedCharSet$$),
        shareReplayChangeLog(this, `selectedCharSet`));

    constructor(
        cdr: ChangeDetectorRef,
        ngRouter: Router,
        errorsMngSvc: LoggingService,
        dialogSvc: DialogService,
        notificationsSvc: NotificationsService,
        private readonly _gameSvc: GameService) {
        super(cdr, ngRouter, errorsMngSvc, dialogSvc, notificationsSvc);
    }

    public override ngOnInit(): void {
        super.ngOnInit();
        this.subscribe([
            this.alphabetVariantId$,
            // this.alphabetChars$,
            this.selectedCharSet$,
        ]);

        this.subscribe(this.alphabetVariantId$, {
            next: avid => {
                this.criteria = avid == null ? undefined : ({ alphabetVariantId: avid });
            }
        });
    }

    protected override createDefaultContext(): undefined {
        return undefined;
    }
    protected override createDefaultCriteria(): ILettersCriteria | undefined {
        return undefined;
    }
    protected override getListItemsCore$(
        context: undefined,
        criteria: ILettersCriteria | undefined)
        : Observable<readonly [item: Char, isSelected: boolean][] | undefined> {
        if (criteria?.alphabetVariantId == null)
            return of(undefined);
        return this._gameSvc.getAlphabetVariantCharOptionsAsync(criteria.alphabetVariantId).pipe(
            catchError(() => of(undefined)),
            tapOnSub(() => this.isLoading = true),
            finalize(() => this.isLoading = false),
            map(map => {
                if (map == null)
                    throw new Error(`Could not load alphabet variant char options.`);
                const rows: [item: Char, isSelected: boolean][] = [];
                const entries = map.entries();
                for (const [key, value] of entries) {
                    rows.push([key, value.isUncommon === false]);
                }
                return rows;
            }),
            startWith(undefined));
    }
    // protected override getListItemsCore$(
    //     context: undefined,
    //     criteria: ILettersCriteria | undefined,
    //     createListItem: (item: Char, isSelected: boolean) => IListItem<Char>)
    //     : Observable<readonly IListItem<Char>[] | undefined> {
    //     if (criteria?.alphabetVariantId == null)
    //         return of(undefined);
    //     return this._gameSvc.getAlphabetVariantCharOptionsAsync(criteria.alphabetVariantId).pipe(
    //         catchError(() => of(undefined)),
    //         tapOnSub(() => this.isLoading = true),
    //         finalize(() => this.isLoading = false),
    //         map(map => {
    //             if (map == null)
    //                 throw new Error(`Could not load alphabet variant char options.`);
    //             const rows: IListItem<Char>[] = [];
    //             const entries = map.entries();
    //             for (const [key, value] of entries) {
    //                 rows.push(createListItem(key, value.isUncommon === false));
    //             }
    //             return rows;
    //         }),
    //         startWith(undefined));
    // }
}

// import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
// import { BehaviorSubject, Subject, of } from 'rxjs';
// import { catchError, distinctUntilChanged, finalize, map, multicast, refCount, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
// import { ReactiveComponent } from ''src/app/common/components/ReactiveComponent';
// import { areSetsEqual } from 'src/app/common/utils/array.utils';
// import { logEvent } from 'src/app/common/utils/dev.utils';
// import { tapOnSub } from 'src/app/common/utils/rxjs.utils';
// import { areEqualCore } from 'src/app/common/utils/utils';
// import { ISelectable, randomInt } from 'src/app/root/models/core';
// import { AlphabetVariant, Char, CharMetadata } from 'src/app/root/models/culture.DTOs';
// import { generateNumbers } from 'src/app/root/models/utils';
// import { GameService } from '../../services/game.service';

// @Component({
//     selector: 'app-letters-selector',
//     templateUrl: './letters-selector.component.html',
//     styleUrls: ['./letters-selector.component.scss'],
//     changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class LettersSelectorComponent extends ReactiveComponent implements OnInit {

//     protected readonly loadingPlaceholders = generateNumbers(1, 30).map(() => generateNumbers(1, randomInt(3, 12)).join(''));

//     private readonly _isLoading$$ = new BehaviorSubject<boolean>(false);
//     public get isLoading() { return this._isLoading$$.value; }
//     private set isLoading(value) { this._isLoading$$.next(value); }
//     @Output()
//     public readonly isLoading$ = this._isLoading$$.pipe(
//         distinctUntilChanged(),
//         tap(value => logEvent(this, 'isLoading', value)),
//         shareReplay({ bufferSize: 1, refCount: true }));

//     private readonly _alphabetVariantId$$ = new BehaviorSubject<AlphabetVariant['id'] | undefined>(undefined);
//     public get alphabetVariantId() { return this._alphabetVariantId$$.value; }
//     @Input()
//     public set alphabetVariantId(value) { this._alphabetVariantId$$.next(value); }
//     @Output()
//     public readonly alphabetVariantId$ = this._alphabetVariantId$$.pipe(distinctUntilChanged());

//     private readonly _alphabetChars$$ = new BehaviorSubject<ReadonlyMap<Char, CharMetadata> | undefined>(undefined);
//     public get alphabetChars() { return this._alphabetChars$$.value; }
//     @Output()
//     public readonly alphabetChars$ = this.alphabetVariantId$.pipe(
//         switchMap(alphabetVariantId => {
//             if (alphabetVariantId == null)
//                 return of(undefined);
//             return this._gameSvc.getAlphabetVariantCharOptionsAsync(alphabetVariantId).pipe(
//                 tapOnSub(() => this.isLoading = true),
//                 catchError(() => of(undefined)),
//                 startWith(undefined),
//                 finalize(() => this.isLoading = false));
//         }),
//         multicast(() => this._alphabetChars$$),
//         refCount(),
//         distinctUntilChanged(),
//         tap(value => logEvent(this, "alphabet chars", value)),
//         shareReplay({ bufferSize: 1, refCount: true }));

//     // private readonly _alphabetChars$$ = new BehaviorSubject<Partial<Record<Char, CharMetadata>> | undefined>(undefined);
//     // public get alphabetChars() { return this._alphabetChars$$.value; }
//     // @Input()
//     // public set alphabetChars(value) { this._alphabetChars$$.next(value); }
//     // @Output()
//     // public readonly alphabetChars$ = this._alphabetChars$$.pipe(
//     //     distinctUntilChanged(),
//     //     tap(value => {
//     //         logEvent(this, 'alphabet chars', value);
//     //     }),
//     //     shareReplay({ bufferSize: 1, refCount: true }));

//     private readonly _selectableItems$$ = new BehaviorSubject<ISelectable<Char>[] | undefined>(undefined);
//     public get selectableItems() { return this._selectableItems$$.value; }
//     @Output()
//     public readonly selectableItems$ = this.alphabetChars$.pipe(
//         map(alphabetChars => {
//             if (alphabetChars == null)
//                 return undefined;
//             if (alphabetChars.size <= 0)
//                 return [];
//             const selectableItems = [...alphabetChars.entries()]
//                 .map<ISelectable<Char>>(char => ({
//                     value: char[0] as Char,
//                     isSelected: char[1]?.isUncommon !== true
//                 }));
//             return selectableItems;
//         }),
//         catchError(() => {
//             return of(undefined);
//         }),
//         multicast(() => this._selectableItems$$),
//         refCount(),
//         distinctUntilChanged(),
//         tap(value => {
//             logEvent(this, 'selectable chars', value);
//         }),
//         shareReplay({ bufferSize: 1, refCount: true }));

//     private readonly _selectionsChanged$$ = new Subject<void>();
//     @Output()
//     public readonly selectionsChanged$ = this._selectionsChanged$$.asObservable();

//     private readonly _selectedItems$$ = new BehaviorSubject<readonly Char[] | undefined>(undefined);
//     public get selectedItems() { return this._selectedItems$$.value; }
//     private selectItems(items: readonly Char[]) { this._selectedItems$$.next(items); }
//     @Output()
//     public readonly selectedItems$ = this.selectableItems$.pipe(
//         map(selectableItems => {
//             if (selectableItems == null)
//                 return undefined;
//             const selectedItems = selectableItems?.filter(sc => sc.isSelected).map(sc => sc.value);
//             return new Set<Char>(selectedItems);
//         }),
//         distinctUntilChanged((l, r) => areEqualCore(l, r, areSetsEqual)),
//         tap(value => {
//             logEvent(this, 'selected chars', value);
//         }),
//         shareReplay({ bufferSize: 1, refCount: true }));

//     constructor(
//         cdr: ChangeDetectorRef,
//         private readonly _gameSvc: GameService) {
//         super(cdr);
//     }

//     ngOnInit(): void {
//         this.subscribe([
//             this.alphabetChars$,
//             this.selectedItems$,
//             this.selectableItems$
//         ]);
//     }

//     public toggleSelection(item: ISelectable<Char>) {
//         if (this.selectableItems == null || this.selectableItems.length <= 0)
//             throw new Error('No character selectable.');
//         if (item == null)
//             throw new Error('Character to toggle not defined.');
//         item.isSelected = !item.isSelected;
//         const newSelections = this.selectableItems.filter(charChoice => charChoice.isSelected).map(x => x.value);
//         this.selectItems(newSelections);
//     }

//     // @Input()
//     // public set charInfos(value: CharInfo[]) { this._charInfos$$.next(value); }
//     // public get charInfos() { return this._charInfos$$.value; }

//     // @Input()
//     // public charInfos$: Observable<CharInfo[]>;
//     // private readonly _charInfos$$ = new BehaviorSubject<CharInfo[]>(null);
// }
