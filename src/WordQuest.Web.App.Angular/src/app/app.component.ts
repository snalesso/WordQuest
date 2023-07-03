import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { ReactiveComponent } from './common/components/ReactiveComponent';

const TITLE_PATH_FRAGS_SEPARATOR = " - ";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends ReactiveComponent implements OnInit {

  constructor(
    private readonly _titleService: Title,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef) {

    super(changeDetectorRef);
  }

  ngOnInit(): void {

    this._router.events
      .pipe(
        filter(x => x instanceof NavigationEnd),
        map(() => {

          let route = this._activatedRoute;

          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        map((route) => route.snapshot),
        map(
          (snapshot) => {

            const titleFrags = [];
            let currRouteComp: ActivatedRouteSnapshot | null = snapshot;

            while (currRouteComp) {

              let titleFrag: string | null = null;

              if (currRouteComp.data['title']) {
                titleFrag = currRouteComp.data['title'];
              }
              // else if (currRouteComp.routeConfig)
              //   titleFrag = AppComponent.toFirstCharUppercase(currRouteComp.routeConfig.path);

              if (titleFrag) {
                titleFrags.push(titleFrag);
              }

              currRouteComp = currRouteComp.parent;
            }

            return titleFrags.reverse();
          })
      )
      .subscribe(
        (titleFrags) => {

          this._titleService.setTitle(
            [
              environment.website.displayName,
              ...titleFrags
            ]
              .join(TITLE_PATH_FRAGS_SEPARATOR)
          );
        });
  }

  // // TODO: find a better place
  // public static toFirstCharUppercase(sourceString: string | null) {

  //     if (sourceString == null)
  //         return null;

  //     return sourceString[0].toUpperCase()
  //         + (sourceString.length > 1
  //             ? sourceString.substr(1)
  //             : "");
  // }
}
