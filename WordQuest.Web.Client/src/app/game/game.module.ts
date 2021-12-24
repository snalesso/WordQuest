import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SortablejsModule } from 'ngx-sortablejs';
import { CategoriesSelectorComponent } from './components/categories-selector/categories-selector.component';
import { LettersSelectorComponent } from './components/letters-selector/letters-selector.component';
import { MatchRoundPhasesComponent } from './pages/match/components/match-round-phases/match-round-phases.component';
import { MatchRoundValidationPhaseComponent } from './pages/match/components/match-round-validation-phase/match-round-validation-phase.component';
import { MatchRoundWordsPhaseComponent } from './pages/match/components/match-round-words-phase/match-round-words-phase.component';
import { MatchRoundComponent } from './pages/match/components/match-round/match-round.component';
import { MatchComponent } from './pages/match/match.component';
import { NewMatchEditorComponent } from './pages/new-match-editor/new-match-editor.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TestComponent } from './pages/test/test.component';
import { GameRoutingModule } from './game-routing.module';
import { AlphabetVariantSelectorComponent } from './components/alphabet-variant-selector/alphabet-variant-selector.component';
import { Utf16CharToggleComponent } from './components/utf16-char-toggle/utf16-char-toggle.component';
import { MatchService } from './services/match.service';
import { GameService } from './services/game.service';
import { NcbCommonModule } from '../common/ncb-common.module';
import { WordInputComponent } from './pages/match/components/word-input/word-input.component';

@NgModule({
    declarations: [
        CategoriesSelectorComponent,
        LettersSelectorComponent,
        NewMatchEditorComponent,
        MatchComponent,
        MatchRoundComponent,
        MatchRoundPhasesComponent,
        MatchRoundWordsPhaseComponent,
        MatchRoundValidationPhaseComponent,
        WordInputComponent,
        LanguageSelectorComponent,
        TestComponent,
        AlphabetVariantSelectorComponent,
        Utf16CharToggleComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        SortablejsModule.forRoot({ animation: 150 }),
        FontAwesomeModule,
        NcbCommonModule,
        GameRoutingModule
    ],
    exports: [
        CategoriesSelectorComponent,
        LettersSelectorComponent,
        NewMatchEditorComponent,
        MatchComponent,
        MatchRoundComponent,
        MatchRoundPhasesComponent,
        MatchRoundWordsPhaseComponent,
        MatchRoundValidationPhaseComponent,
        TestComponent
    ],
    providers: [
        GameService,
        MatchService
    ],
    bootstrap: []
})
export class GameModule {

    constructor(library: FaIconLibrary) {

        // NG DOCS: https://github.com/FortAwesome/angular-fontawesome#documentation
        // ALL FREE ICONS: https://fontawesome.com/icons?d=gallery&s=brands,regular,solid&m=free
        // library.addIcons(fasSun, fasStar, fasMoon, fabAccessible);
        library.addIconPacks(fas, fab);
    }
}
