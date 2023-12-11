import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from './navigation/models/presentation';
import { PageNotFoundComponent } from './navigation/pages/page-not-found/page-not-found.component';

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
    path: 'common',
    loadChildren: () => import('./common/app-common.routes.module').then(m => m.AppCommonRoutesModule),
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
