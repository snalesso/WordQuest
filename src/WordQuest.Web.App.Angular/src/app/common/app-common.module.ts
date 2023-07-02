import { NgModule } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { IsDisabledDirective } from './directives/is-disabled.directive';
import { IsEnabledDirective } from './directives/is-enabled.directive';
import { CoalescePipe } from './pipes/coalesce';
import { EmptyPipe } from './pipes/empty';
import { FalsyToNull } from './pipes/falsyToNull';
import { IsNilPipe } from './pipes/isNil';
import { IsNilOrEmptyPipe } from './pipes/isNilOrEmpty';
import { KeepPipe } from './pipes/keep';
import { NegatePipe } from './pipes/negate';
import { ThrutifyPipe } from './pipes/thruthify';
import { GlobalizationService } from './services/globalization.service';

// @NgModule({
//     declarations: [
//         // NcbApiService,
//         ReactiveComponent,
//         FalsyToNull,
//         IsNil,
//         IsDisabledDirective
//     ],
//     imports: [
//         HttpClientModule
//     ],
//     exports: [
//         // NcbApiService,
//         ReactiveComponent,
//         FalsyToNull,
//         IsNil,
//         IsDisabledDirective
//     ],
//     providers: [
//         GlobalizationService
//     ],
//     bootstrap: []
// })

const PIPES = [
    // PushPipe,
    KeepPipe,
    NegatePipe,
    CoalescePipe,
    ThrutifyPipe,
    IsNilPipe,
    FalsyToNull,
    EmptyPipe,
    IsNilOrEmptyPipe,
];
const DIRECTIVES = [
    IsEnabledDirective,
    IsDisabledDirective,
];
const COMPONENTS: any[] = [];

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...PIPES,
        ...DIRECTIVES
    ],
    imports: [
        ReactiveComponentModule
    ],
    exports: [
        ...COMPONENTS,
        ...PIPES,
        ...DIRECTIVES
    ],
    providers: [
        GlobalizationService
    ]
})
export class AppCommonModule {
    constructor() { }
}
