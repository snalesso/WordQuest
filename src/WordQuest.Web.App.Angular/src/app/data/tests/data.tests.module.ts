import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PushPipe } from '@ngrx/component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { IndexComponent } from './components/index/index.component';
import { DataTestsRoutingModule } from './data.tests.routing.module';
import { AnimalsService } from './services/animals.service';

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

        SharedModule,
        DataTestsRoutingModule,
    ],
    declarations: [
        ...COMPONENTS,
    ],
    providers: [
        ...SERVICES,
    ]
})
export class DataTestsModule { }
