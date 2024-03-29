import { ChangeDetectorRef, Component, Output } from '@angular/core';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { SystemService } from 'src/app/common/services/system.service';
import { environment } from 'src/environments/environment.dev';
import { Language } from '../../models/culture.DTOs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ReactiveComponent {

    constructor(
        cdr: ChangeDetectorRef,
        private readonly _systemSvc: SystemService,
        private readonly _globalizationSvc: GlobalizationService) {
        super(cdr);
    }

    public get appDisplayName(): string { return environment.website.displayName; }
    public get hostAddress(): string { return environment.api.getHostAddress(); }

    @Output()
    public readonly languages$ = this._globalizationSvc.languages$;
    @Output()
    public readonly areLanguagesAvailable$ = this._globalizationSvc.languages$.pipe(map(languages => languages.size > 0));

    public setLanguage(language: Language) { return this._globalizationSvc.setlanguage(language); }
    @Output()
    public readonly selectedLanguage$ = this._globalizationSvc.selectedLanguage$;

    @Output()
    public readonly isLanguageSelected$ = this._globalizationSvc.selectedLanguage$.pipe(
        map(sl => sl !== undefined),
        defaultIfEmpty(false)); // TODO: check if empty replay subject appears as empty

    public showSystemInfo() {
        this._systemSvc.getSystemInfo().subscribe(dateTime => {
            alert(dateTime);
        });
    }
}
