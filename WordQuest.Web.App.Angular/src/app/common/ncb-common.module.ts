import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveComponent } from './components/ReactiveComponent';
import { FalsyToNull } from './pipes/falsyToNull';
import { GlobalizationService } from './services/globalization.service';
import { NcbApiService } from './services/ncb-api.service';
import { IsDisabledDirective } from './directives/is-disabled.directive';
import { IsNil } from './pipes/isNil';

@NgModule({
    declarations: [
        // NcbApiService,
        ReactiveComponent,
        FalsyToNull,
        IsNil,
        IsDisabledDirective
    ],
    imports: [
        HttpClientModule
    ],
    exports: [
        // NcbApiService,
        ReactiveComponent,
        FalsyToNull,
        IsNil,
        IsDisabledDirective
    ],
    providers: [
        GlobalizationService
    ],
    bootstrap: []
})
export class NcbCommonModule {

    constructor() { }
}
