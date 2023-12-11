import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { devEnvGuard } from '../shared/guards/dev-env.guard';

export const routes: Routes = [
    {
        path: 'tests',
        canActivate: [devEnvGuard],
        loadChildren: () => import('./tests/data.tests.module').then(m => m.DataTestsModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataRoutingModule { }
