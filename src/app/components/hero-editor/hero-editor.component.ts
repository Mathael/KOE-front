import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeroService} from "../../service/hero.service";
import {Hero} from "../../model";
import {Stat} from "../../model/Stat";

@Component({
    moduleId: module.id,
    selector: 'hero-editor',
    templateUrl: './hero-editor.component.html',
    styleUrls: ['./hero-editor.component.css', '../../../assets/css/global.css'],
    providers: [HeroService]
})
export class HeroEditorComponent implements OnInit {

    // All heroes fetched from API
    private _heroes: Hero[] = [];

    // The current selected Hero
    private _selectedHero: Hero = null;

    // List of all availables stats (sort usage)
    private _stats: Stat[] = [];
    private _searchStat : string = null;

    // Displayed Heroes are the heroes printed on screen.
    // We're using this array because of SearchEngine
    private _displayedHeroes: Hero[];

    @ViewChild('searchBox')
    private input: ElementRef;

    constructor(private heroService: HeroService) {}

    ngOnInit() {
        this.loadHeroes(() => {
            if (this._heroes.length > 0)
                this._heroes[0].stats.forEach(stat => {
                    let currentStatCopy = Object.assign({}, {
                        sid: stat.sid,
                        label: stat.label,
                        value: 0
                    });
                    this._stats.push(currentStatCopy);
                })
        });
    }

    // Store heroes in an array and store displayed heroes in another array
    loadHeroes(callback: Function): void {
        this.heroService.findAll().subscribe(
            heroes => {
                this._heroes = heroes;
                this._displayedHeroes = this._heroes;
                callback();
            },
            this.errorCallBack
        );
    }

    // Delete an Hero by his identifier
    // if API answer True, we remove the Hero from front
    remove(id: string): void {
        if (!id) return;
        this
            .heroService
            .remove(id)
            .subscribe(response => {
                if (response) {
                    let hero: Hero = this._heroes.find((h) => h.id == id);
                    this._heroes.splice(this._heroes.indexOf(hero), 1);
                }
            }, this.errorCallBack);
    }

    // Click handler
    selectHero(hero: Hero): void {
        if (!hero) return;
        this._selectedHero = hero;
    }

    // Search handler when writing text in search bar
    search(term: string) {
        if (!term || term == '') {
            if (this._displayedHeroes && this._displayedHeroes.length != this._heroes.length)
                this._displayedHeroes = this._heroes;
            return;
        }

        this._displayedHeroes = this._heroes.filter(hero => hero.name.toLowerCase().indexOf(term.toLowerCase()) != -1);
    }

    statsChangeFunction(stats : Stat[], stat:Stat, value : number) : void {
        if(!this._stats || !stat || !value) return;
        let total = this._stats.map(stat => stat.value).reduce((a,b) => a + b, 0);
        if(total == 0 && value < 0 ||
            total == 40 && value > 0 ||
            (stat.value <= 0 && value < 0)) {
            return;
        }
        stat.value += value;
    }

    statsValidator(stat:Stat, value : number) : boolean {
        return true;
    }

    sortByStats(value:number) {
        this._displayedHeroes = this._heroes.filter(hero =>
            hero.stats.find(stat =>
                stat.sid == this._searchStat && stat.value >= value
            ) != null
        );
    }

    // Synchronize Hero changes with the API
    update(hero: Hero): void {
        if (!hero) return;
        this
            .heroService
            .update(hero)
            .subscribe(data => {
                console.log(data);
            }, this.errorCallBack);
    }

    create() {
        this._selectedHero = new Hero(null, 'Unamed', 'Ce héro ne possède aucune description.');
    }

    errorCallBack(err) {
        console.error(err);
    }
}
