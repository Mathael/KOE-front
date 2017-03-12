import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroEditorComponent} from "./components/hero-editor/hero-editor.component";
import {HeroGameComponent} from "./components/hero-game/hero-game.component";

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'editor',  component: HeroEditorComponent },
    { path: 'game',  component: HeroGameComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
