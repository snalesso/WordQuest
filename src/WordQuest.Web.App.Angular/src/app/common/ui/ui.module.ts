import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiRoutesModule } from './ui.routes.module';

const SERVICES: any[] = [];
const COMPONENTS: any[] = [];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        UiRoutesModule,
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
export class UiModule { }
