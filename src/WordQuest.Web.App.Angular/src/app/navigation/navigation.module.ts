import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PushPipe } from '@ngrx/component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TestComponent } from './pages/test/test.component';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  NavMenuComponent,
  PageNotFoundComponent,
  HomeComponent,
  TestComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    PushPipe,
    SharedModule,
  ],
  exports: [
    ...COMPONENTS,
  ],
  providers: []
})
export class NavigationModule {

  constructor(library: FaIconLibrary) {

    // NG DOCS: https://github.com/FortAwesome/angular-fontawesome#documentation
    // ALL FREE ICONS: https://fontawesome.com/icons?d=gallery&s=brands,regular,solid&m=free
    // library.addIcons(fasSun, fasStar, fasMoon, fabAccessible);
    library.addIconPacks(fas, fab);
  }
}
