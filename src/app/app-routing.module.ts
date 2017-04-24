import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroEditorComponent, HeroGameComponent, ItemComponent, ItemEditorComponent} from "./components";

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'editor',  component: HeroEditorComponent },
    { path: 'items',  component: ItemComponent },
    { path: 'items-editor',  component: ItemEditorComponent },
    { path: 'game',  component: HeroGameComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
