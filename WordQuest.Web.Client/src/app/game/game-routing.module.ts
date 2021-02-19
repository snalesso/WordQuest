import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes, Data } from '@angular/router';
import { RouteData } from '../root/models/presentation';
import { GuideComponent } from './pages/guide/guide.component';
import { MatchComponent } from './pages/match/match.component';
import { NewMatchEditorComponent } from './pages/new-match-editor/new-match-editor.component';
import { TestComponent } from './pages/test/test.component';

export const gameRoutes: ReadonlyArray<Route> = [
    {
        path: "",
        redirectTo: "new",
        pathMatch: "full",
    },
    {
        path: "new",
        component: NewMatchEditorComponent,
        data: ({
            UI: {
                pageTitleKey: "New match"
            }
        } as RouteData)
    },
    {
        path: "test",
        component: TestComponent,
        data: ({
            UI: {
                pageTitleKey: "Test"
            }
        } as RouteData)
    },
    {
        path: ":matchId",
        component: MatchComponent,
        data: ({
            UI: {
                pageTitleKey: "Match"
            }
        } as RouteData)
    }
];

// export const appRoutes: ReadonlyArray<Route> = routes;

@NgModule({
    imports: [RouterModule.forChild(gameRoutes as Routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
