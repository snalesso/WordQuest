import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteData } from '../navigation/models/presentation';
import { GuideComponent } from './pages/guide/guide.component';
import { MatchComponent } from './pages/match/match.component';
import { NewMatchEditorComponent } from './pages/new-match-editor/new-match-editor.component';
import { TestComponent } from './pages/test/test.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'matches',
    },
    {
        path: 'matches',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'new',
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
                path: ":matchId",
                component: MatchComponent,
                data: ({
                    UI: {
                        pageTitleKey: "Match"
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
                path: "guide",
                component: GuideComponent,
                data: ({
                    UI: {
                        pageTitleKey: "Guide"
                    }
                } as RouteData)
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
