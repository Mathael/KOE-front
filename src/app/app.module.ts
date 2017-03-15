import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { HeroEditorComponent, BattlefieldComponent, HeroSelectorComponent, HeroGameComponent, HeroGameConfigComponent } from './components';
import { HeroEditorPatternComponent } from './components/hero-editor-pattern/hero-editor-pattern.component';
import { HeroEditorStatsComponent } from './components/hero-editor-stats/hero-editor-stats.component';
import { HeroEditorImageComponent } from './components/hero-editor-image/hero-editor-image.component';

@NgModule({
    declarations: [
        AppComponent,
        HeroEditorComponent,
        BattlefieldComponent,
        HeroSelectorComponent,
        HeroGameComponent,
        HeroGameConfigComponent,
        HeroEditorPatternComponent,
        HeroEditorStatsComponent,
        HeroEditorImageComponent,
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
