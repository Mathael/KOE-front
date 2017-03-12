import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { HeroEditorComponent, BattlefieldComponent, HeroSelectorComponent, HeroGameComponent } from './components';
import { HeroGameConfigComponent } from './components/hero-game-config/hero-game-config.component';

@NgModule({
    declarations: [
        AppComponent,
        HeroEditorComponent,
        BattlefieldComponent,
        HeroSelectorComponent,
        HeroGameComponent,
        HeroGameConfigComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
