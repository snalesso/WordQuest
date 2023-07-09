import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PushModule } from '@ngrx/component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes.module';
import { GameModule } from './game/game.module';
import { GameRoutingModule } from './game/game.routes.module';
import { RootModule } from './root/root.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    PushModule,
    FontAwesomeModule,

    RootModule,
    AppRoutingModule,

    GameModule,
    GameRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
