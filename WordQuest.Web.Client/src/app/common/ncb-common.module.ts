import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveComponent } from './components/ReactiveComponent';
import { FalsyToNull } from './pipes/falsyToNull';
import { GlobalizationService } from './services/globalization.service';
import { NcbApiService } from './services/ncb-api.service';

@NgModule({
    declarations: [
        // NcbApiService,
        ReactiveComponent,
        FalsyToNull
    ],
    imports: [
        HttpClientModule
    ],
    exports: [
        // NcbApiService,
        ReactiveComponent,
        FalsyToNull
    ],
    providers: [
        GlobalizationService
    ],
    bootstrap: []
})
export class NcbCommonModule {

    constructor() { }
}
