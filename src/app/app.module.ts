import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {
    HeroEditorComponent,
    BattlefieldComponent,
    HeroSelectorComponent,
    HeroGameComponent,
    HeroGameConfigComponent,
    HeroEditorPatternComponent,
    HeroEditorImageComponent,
    HeroEditorStatsComponent,
    HeroEditorItemComponent,
    ItemComponent
} from './components';

@NgModule({
    declarations: [
        AppComponent,
        BattlefieldComponent,
        HeroEditorComponent,
        HeroEditorItemComponent,
        HeroEditorPatternComponent,
        HeroEditorStatsComponent,
        HeroEditorImageComponent,
        HeroGameComponent,
        HeroGameConfigComponent,
        HeroSelectorComponent,
        ItemComponent,
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
