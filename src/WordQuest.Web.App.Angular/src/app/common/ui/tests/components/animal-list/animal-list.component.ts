import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ItemsListBaseComponent } from 'src/app/common/components/items-list-base.component';
import { DialogService } from 'src/app/common/services/dialog.service';
import { LoggingService } from 'src/app/common/services/logging.service';
import { NotificationsService } from 'src/app/common/services/notifications.service';
import { getRandomInt } from 'src/app/common/utils/number.utils';
import { IAnimal } from '../../models/IAnimal';
import { AnimalsService } from '../../services/animals.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalListComponent extends ItemsListBaseComponent<IAnimal, IAnimal['name']> {

  constructor(
    cdr: ChangeDetectorRef,
    ngRouter: Router,
    errorsMngSvc: LoggingService,
    dialogSvc: DialogService,
    notificationsSvc: NotificationsService,
    private readonly _animalsSvc: AnimalsService) {
    super(cdr, ngRouter, errorsMngSvc, dialogSvc, notificationsSvc);
  }

  protected override createDefaultContext(): undefined {
    return undefined;
  }
  protected override createDefaultCriteria(): undefined {
    return undefined;
  }
  protected override getIdentityFromItem(item: IAnimal): string {
    return item.name;
  }
  protected override getListItemsCore$(context: undefined, criteria: undefined): Observable<readonly [item: IAnimal, isSelected: boolean][] | undefined> {
    return this._animalsSvc.getAll$().pipe(map(animals => {
      return animals.map(a => [a, getRandomInt(0, 1) === 0]);
    }));
  }

}
