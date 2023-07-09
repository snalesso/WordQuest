import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PushModule } from '@ngrx/component';
import { AppCommonModule } from '../common/app-common.module';
import { AlphabetVariantSelectorComponent } from './components/alphabet-variant-selector/alphabet-variant-selector.component';
import { CategoriesSelectorComponent } from './components/categories-selector/categories-selector.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { LettersSelectorComponent } from './components/letters-selector/letters-selector.component';
import { Utf16CharToggleComponent } from './components/utf16-char-toggle/utf16-char-toggle.component';
import { GameRoutingModule } from './game.routes.module';
import { MatchRoundPhasesComponent } from './pages/match/components/match-round-phases/match-round-phases.component';
import { MatchRoundValidationPhaseComponent } from './pages/match/components/match-round-validation-phase/match-round-validation-phase.component';
import { MatchRoundWordsPhaseComponent } from './pages/match/components/match-round-words-phase/match-round-words-phase.component';
import { MatchRoundComponent } from './pages/match/components/match-round/match-round.component';
import { WordInputComponent } from './pages/match/components/word-input/word-input.component';
import { MatchComponent } from './pages/match/match.component';
import { NewMatchEditorComponent } from './pages/new-match-editor/new-match-editor.component';
import { TestComponent } from './pages/test/test.component';
import { GameService } from './services/game.service';
import { MatchService } from './services/match.service';

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
        Utf16CharToggleComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FontAwesomeModule,
        AppCommonModule,
        GameRoutingModule,
        PushModule
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
// TODO: rename to matches module (game should be the whole site)
export class GameModule {

    constructor(library: FaIconLibrary) {

        // NG DOCS: https://github.com/FortAwesome/angular-fontawesome#documentation
        // ALL FREE ICONS: https://fontawesome.com/icons?d=gallery&s=brands,regular,solid&m=free
        // library.addIcons(fasSun, fasStar, fasMoon, fabAccessible);
        // DOCS: https://github.com/FortAwesome/angular-fontawesome#compatibility-table
        library.addIconPacks(fas, fab);
    }
}
