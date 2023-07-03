import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PushModule } from '@ngrx/component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameRoutingModule } from './game/game-routing.module';
import { GameModule } from './game/game.module';
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
