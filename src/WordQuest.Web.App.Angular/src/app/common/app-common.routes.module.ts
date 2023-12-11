import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { devEnvGuard } from './guards/dev-env.guard';

const routes: Routes = [
    {
        path: 'ui',
        canActivate: [devEnvGuard],
        loadChildren: () => import('./ui/ui.module').then(m => m.UiModule),
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AppCommonRoutesModule { }
