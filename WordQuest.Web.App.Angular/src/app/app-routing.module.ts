import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes, } from '@angular/router';
import { PageNotFoundComponent } from './root/pages/page-not-found/page-not-found.component';
import { RouteData } from './root/models/presentation';

export const appRoutes: ReadonlyArray<Route> = [
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
