import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PushPipe } from '@ngrx/component';
import { AppCommonModule } from '../common/app-common.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TestComponent } from './pages/test/test.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    HomeComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppCommonModule,
    PushPipe
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    HomeComponent,
    TestComponent
  ],
  providers: [],
  bootstrap: []
})
export class RootModule {

  constructor(library: FaIconLibrary) {

    // NG DOCS: https://github.com/FortAwesome/angular-fontawesome#documentation
    // ALL FREE ICONS: https://fontawesome.com/icons?d=gallery&s=brands,regular,solid&m=free
    // library.addIcons(fasSun, fasStar, fasMoon, fabAccessible);
    library.addIconPacks(fas, fab);
  }
}
