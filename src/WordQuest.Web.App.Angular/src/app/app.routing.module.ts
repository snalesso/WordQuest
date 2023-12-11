import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from './navigation/models/presentation';
import { PageNotFoundComponent } from './navigation/pages/page-not-found/page-not-found.component';
import { devEnvGuard } from './shared/guards/dev-env.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full'
  },
  {
    path: "game",
    loadChildren: () => import("./game/game.module").then(m => m.GameModule)
  },
  {
    path: 'data',
    canActivate: [devEnvGuard],
    loadChildren: () => import('./data/data.module').then(m => m.DataModule),
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    data: ({
      UI: {
        pageTitleKey: "Ooops!"
      }
    } as RouteData)
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
