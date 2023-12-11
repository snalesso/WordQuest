import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataRoutingModule } from './data.routing.module';

const SERVICES: any[] = [];
const COMPONENTS: any[] = [];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        DataRoutingModule,
    ],
    declarations: [
        ...COMPONENTS,
    ],
    exports: [
        ...COMPONENTS,
        ...SERVICES,
    ],
    providers: [
        ...SERVICES,
    ]
})
export class DataModule { }
