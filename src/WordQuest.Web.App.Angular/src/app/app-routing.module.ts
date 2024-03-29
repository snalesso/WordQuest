import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes, } from '@angular/router';
import { RouteData } from './root/models/presentation';
import { PageNotFoundComponent } from './root/pages/page-not-found/page-not-found.component';

export const appRoutes: ReadonlyArray<Route> = [
  {
    path: '',
    redirectTo: 'matches',
    pathMatch: 'full'
  },
  {
    path: "matches",
    loadChildren: () => import("./game/game.module").then(m => m.GameModule)
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

// export const appRoutes: ReadonlyArray<Route> = routes;

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes as Routes,
    //  { preloadingStrategy: PreloadAllModules }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
