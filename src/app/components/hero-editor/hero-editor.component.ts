import {Component, OnInit} from '@angular/core';
import {HeroService} from "../../service/hero.service";
import {Hero} from "../../model";

@Component({
    moduleId: module.id,
    selector: 'hero-editor',
    templateUrl: './hero-editor.component.html',
    styleUrls: ['./hero-editor.component.css', '../../../assets/css/global.css'],
    providers: [HeroService]
})
export class HeroEditorComponent implements OnInit {

    // All heroes fetched from API
    private _heroes:Hero[] = [];

    // The current selected Hero
    private _selectedHero:Hero = null;

    // Displayed Heroes are the heroes printed on screen.
    // We're using this array because of SearchEngine
    private _displayedHeroes:Hero[];

    constructor(private heroService:HeroService) {}

    ngOnInit() {
        this.loadHeroes();
    }

    // Store heroes in an array and store displayed heroes in another array
    loadHeroes() :void {
        this.heroService.findAll().subscribe(
            heroes => {
                this._heroes = heroes;
                this._displayedHeroes = this._heroes;
            },
            err => console.error(err)
        );
    }

    // Delete an Hero by his identifier
    // if API answer True, we remove the Hero from front
    remove(id:string):void{
        if(!id) return;
        this.heroService.remove(id).subscribe((response) => {
            if(response) {
                let hero:Hero = this._heroes.find((h) => h.id == id);
                this._heroes.splice(this._heroes.indexOf(hero), 1);
            }
        }, err => console.error(err));
    }

    // Click handler
    selectHero(hero:Hero):void{
        if(!hero) return;
        this._selectedHero = hero;
    }

    // Search handler when writing text in search bar
    search(term:string) {
        if(!term || term == '') {
            if(this._displayedHeroes.length != this._heroes.length)
                this._displayedHeroes = this._heroes;
            return;
        }

        this._displayedHeroes = this._heroes.filter(hero => hero.name.toLowerCase().indexOf(term.toLowerCase()) != -1);
    }

    // Synchronize Hero changes with the API
    update(hero:Hero):void{
        if(!hero) return;
        this.heroService.update(hero).subscribe((data) => {
            console.log(data);
            if(data == true) this._selectedHero = null;
        }, err => console.error(err));
    }
}
