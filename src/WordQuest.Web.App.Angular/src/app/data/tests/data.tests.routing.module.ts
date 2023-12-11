import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { devEnvGuard } from 'src/app/shared/guards/dev-env.guard';
import { AnimalListComponent } from './components/animal-list/animal-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'animals',
        pathMatch: 'full',
        // component: IndexComponent,
        // canActivate: [devEnvGuard],
    },
    {
        path: 'animals',
        component: AnimalListComponent,
        canActivate: [devEnvGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataTestsRoutingModule { }
