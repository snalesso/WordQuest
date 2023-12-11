import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { AppCommonModule } from '../../app-common.module';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { IndexComponent } from './components/index/index.component';
import { AnimalsService } from './services/animals.service';
import { UiTestsRoutesModule } from './ui.tests.routes.module';

const SERVICES: any[] = [
    AnimalsService,
];
const COMPONENTS = [
    IndexComponent,
    AnimalListComponent,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PushPipe,

        AppCommonModule,
        UiTestsRoutesModule,
    ],
    declarations: [
        ...COMPONENTS,
    ],
    providers: [
        ...SERVICES,
    ]
})
export class UiTestsModule { }
