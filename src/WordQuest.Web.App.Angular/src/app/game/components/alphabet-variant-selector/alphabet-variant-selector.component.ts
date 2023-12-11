import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AlphabetVariantOption } from 'src/app/navigation/models/culture.DTOs';
import { ItemsListBaseComponent } from 'src/app/shared/components/items-list-base.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { logEvent } from 'src/app/shared/utils/dev.utils';
import { isNotNil } from 'src/app/shared/utils/utils';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-alphabet-variant-selector',
  templateUrl: './alphabet-variant-selector.component.html',
  styleUrls: ['./alphabet-variant-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetVariantSelectorComponent
  extends ItemsListBaseComponent<AlphabetVariantOption, AlphabetVariantOption['id'], undefined, undefined>
  implements OnInit {

  private readonly _gameService: GameService;

  constructor(
    cdr: ChangeDetectorRef,
    ngRouter: Router,
    errorsMngSvc: LoggingService,
    dialogSvc: DialogService,
    notificationsSvc: NotificationsService,
    gameService: GameService) {
    super(cdr, ngRouter, errorsMngSvc, dialogSvc, notificationsSvc);
    this._gameService = gameService;
  }

  public override ngOnInit(): void {
    super.ngOnInit();

    this.subscribe(merge());

    this.subscribe(this.isLoading$, {
      next: isLoading => {
        logEvent(this, 'isLoading', isLoading);
      }
    })

    /** Select first alphabet variant */
    this.subscribe(
      this.listItems$.pipe(filter(isNotNil), map(rows => rows.find(isNotNil)), filter(isNotNil)), {
      next: firstRow => {
        firstRow.isSelected = true;
      }
    });
  }

  protected override createDefaultContext(): undefined {
    return undefined;
  }
  protected override createDefaultCriteria(): undefined {
    return undefined;
  }
  protected override getIdentityFromItem(listItem: AlphabetVariantOption): string {
    return listItem.id;
  }
  protected override getListItemsCore$(
    context: undefined,
    criteria: undefined)
    : Observable<readonly [item: AlphabetVariantOption, isSelected: boolean][] | undefined> {
    return this._gameService.getAlphabetVariantOptionsAsync().pipe(map(options => {
      return options.map(o => [o, false]);
    }));
  }
}
