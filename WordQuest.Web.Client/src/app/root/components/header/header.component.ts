import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { environment } from 'src/environments/environment';
import { Language } from '../../models/culture.DTOs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ReactiveComponent {

    constructor(
        private readonly _globalizationService: GlobalizationService,
        changeDetectorRef: ChangeDetectorRef) {

        super(changeDetectorRef);
    }

    public get appDisplayName(): string { return environment.website.displayName; }

    public get availableLanguages$() { return this._globalizationService.availableLanguages$; }
    public get availableLanguagesMap$() { return this._globalizationService.availableLanguagesMap$; }
    public get selectedLanguage$(): Observable<Language> { return this._globalizationService.language$; }

    public async setLanguageAsync(language: Language) {
        await this._globalizationService.setlanguage(language);
    }
}
