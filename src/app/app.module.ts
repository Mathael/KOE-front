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
    HeroEditorStatsComponent,
    HeroEditorItemComponent,
    ItemComponent,
    ItemEditorComponent
} from './components';
import {PushNotificationComponent} from "ng2-notifications/ng2-notifications";
import {NotificationService} from "./service/notification.service";
import { EditorImageComponent } from './components/editor-image/editor-image.component';

@NgModule({
    declarations: [
        AppComponent,
        BattlefieldComponent,
        HeroEditorComponent,
        HeroEditorItemComponent,
        HeroEditorPatternComponent,
        HeroEditorStatsComponent,
        HeroGameComponent,
        HeroGameConfigComponent,
        HeroSelectorComponent,
        ItemComponent,
        ItemEditorComponent,
        PushNotificationComponent,
        EditorImageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    providers: [NotificationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
