import { NgModule } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { IsDisabledDirective } from './directives/is-disabled.directive';
import { IsEnabledDirective } from './directives/is-enabled.directive';
import { CoalescePipe } from './pipes/coalesce';
import { FalsyToNull } from './pipes/falsyToNull';
import { IsEmptyPipe } from './pipes/isEmpty';
import { IsNilPipe } from './pipes/isNil';
import { IsNilOrEmptyPipe } from './pipes/isNilOrEmpty';
import { IsNotNilPipe } from './pipes/isNotNil';
import { KeepPipe } from './pipes/keep';
import { LogPipe } from './pipes/log';
import { NegatePipe } from './pipes/negate';
import { ThrowIfNilPipe } from './pipes/throwIfNil';
import { ThrutifyPipe } from './pipes/thruthify';
import { GlobalizationService } from './services/globalization.service';
import { SystemService } from './services/system.service';

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
    IsNotNilPipe,
    FalsyToNull,
    IsEmptyPipe,
    IsNilOrEmptyPipe,
    ThrowIfNilPipe,
    LogPipe,
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
        PushPipe
    ],
    exports: [
        ...COMPONENTS,
        ...PIPES,
        ...DIRECTIVES
    ],
    providers: [
        SystemService,
        GlobalizationService,
    ]
})
export class AppCommonModule {
    constructor() { }
}
