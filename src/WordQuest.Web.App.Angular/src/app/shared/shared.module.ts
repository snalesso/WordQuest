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
import { SharedRoutingModule } from './shared.routing.module';

const PIPES = [
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
        ...DIRECTIVES,
    ],
    imports: [
        PushPipe,

        SharedRoutingModule,
    ],
    exports: [
        ...COMPONENTS,
        ...PIPES,
        ...DIRECTIVES,
    ],
    providers: [
    ]
})
export class SharedModule { }
