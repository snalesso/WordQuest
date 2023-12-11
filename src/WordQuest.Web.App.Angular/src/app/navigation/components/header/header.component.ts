import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { ReactiveComponent } from 'src/app/common/components/ReactiveComponent';
import { GlobalizationService } from 'src/app/common/services/globalization.service';
import { SystemService } from 'src/app/common/services/system.service';
import { shareReplayChangeLog } from 'src/app/common/utils/debug/rxjs';
import { environment } from 'src/environments/environment';
import { Language } from '../../models/culture.DTOs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends ReactiveComponent implements OnInit {

    constructor(
        cdr: ChangeDetectorRef,
        private readonly _systemSvc: SystemService,
        private readonly _globalizationSvc: GlobalizationService) {
        super(cdr);
    }

    public ngOnInit(): void {
        this.subscribe([
            this.languages$,
            this.areLanguagesAvailable$,
            this.selectedLanguage$,
            this.isLanguageSelected$,
        ]);
    }

    public readonly logoLabel = environment.website.displayName; // + ((environment.env.label?.length ?? 0) > 0 ? ` - ${environment.env.label}` : '');
    public readonly envLabel = environment.mode.label;
    public readonly isEnvLabelVisible = environment.mode.code === 'dev';
    public readonly hostAddress = environment.api.getHostAddress();

    @Output() public readonly languages$ = this._globalizationSvc.languages$.pipe(shareReplayChangeLog(this, 'languages'));

    @Output() public readonly areLanguagesAvailable$ = this._globalizationSvc.areLanguagesAvailable$.pipe(shareReplayChangeLog(this, 'areLanguagesAvailable'));

    @Output() public readonly selectedLanguage$ = this._globalizationSvc.selectedLanguage$.pipe(shareReplayChangeLog(this, 'selectedLanguage'));
    public selectLanguage(language: Language) { return this._globalizationSvc.selectLanguage(language); }

    @Output() public readonly isLanguageSelected$ = this._globalizationSvc.isLanguageSelected$.pipe(shareReplayChangeLog(this, 'isLanguageSelected'));

    public showSystemInfo() {
        this.subscribe(this._systemSvc.getSystemInfo(), {
            next: dateTime => {
                alert(dateTime);
            }
        });
    }
}
