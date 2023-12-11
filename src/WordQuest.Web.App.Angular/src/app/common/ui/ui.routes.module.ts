import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { devEnvGuard } from '../guards/dev-env.guard';

export const routes: Routes = [
    {
        path: 'tests',
        canActivate: [devEnvGuard],
        loadChildren: () => import('./tests/ui.tests.module').then(m => m.UiTestsModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UiRoutesModule { }
