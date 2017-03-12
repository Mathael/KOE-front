import {Component, OnInit} from '@angular/core';
import {HeroService} from "../../service/hero.service";
import {Hero} from "../../model";
import {Stat} from "../../model/Stat";
import {Case} from "../../model/Case";
import {Coordinate} from "../../model/Coordinate";

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

    // Two dimension tab to display cases
    private _movePatternCases:any[] = [];
    private _attackPatternCases:any[] = [];
    private _assistancePatternCases:any[] = [];

    constructor(private heroService:HeroService) {}

    ngOnInit() {
        this.loadHeroes();

        for(let i=0;i<7;i++){
            this._movePatternCases[i] = [];
            for(let j=0;j<7;j++) {
                this._movePatternCases[i][j] = new Case(i+':'+j, i, j);
            }
        }

        for(let i=0;i<7;i++){
            this._attackPatternCases[i] = [];
            for(let j=0;j<7;j++) {
                this._attackPatternCases[i][j] = new Case(i+':'+j, i, j);
            }
        }

        for(let i=0;i<7;i++){
            this._assistancePatternCases[i] = [];
            for(let j=0;j<7;j++) {
                this._assistancePatternCases[i][j] = new Case(i+':'+j, i, j);
            }
        }
    }

    loadHeroes() :void {
        this.heroService.findAll().subscribe(
            heroes => {
                this._heroes = heroes;
                this._displayedHeroes = this._heroes;
            },
            err => console.error(err)
        );
    }

    remove(id:string):void{
        if(!id) return;
        this.heroService.remove(id).subscribe((response) => {
            if(response) {
                let hero:Hero = this._heroes.find((h) => h.id == id);
                this._heroes.splice(this._heroes.indexOf(hero), 1);
            }
        }, err => console.error(err));
    }

    selectHero(hero:Hero):void{
        if(!hero) return;
        this._selectedHero = hero;
    }

    search(term:string) {
        if(!term || term == '') {
            if(this._displayedHeroes.length != this._heroes.length)
                this._displayedHeroes = this._heroes;
            return;
        }

        this._displayedHeroes = this._heroes.filter((hero) => hero.name.toLowerCase().indexOf(term.toLowerCase()) != -1);
    }

    update(hero:Hero):void{
        if(!hero) return;
        this.heroService.update(hero).subscribe((data) => {
            console.log(data);
            if(data == true) this._selectedHero = null;
        }, err => console.error(err));
    }

    validateStats(stat:Stat):void{
        let pts = this.getTotalUsedStatPoints();
        if(pts > 40) stat.value = 40 - pts;
    }

    resetStatsPoints():void{
        this._selectedHero.stats.forEach((stat) => {
            if(stat.sid != 'HEALTH') stat.value = 0;
        });
    }

    getTotalUsedStatPoints() {
        if(!this._selectedHero) return;
        let sum = 0;
        this._selectedHero.stats.forEach((stat) => {
            if(stat.sid != 'HEALTH') sum += stat.value
        });
        return sum;
    }

    hasMovePattern(x:number, y:number){
        return this._selectedHero.movePattern.find(coord => coord.x == (x) && coord.y == (y)) != null;
    }

    hasAttackPattern(x:number, y:number){
        return this._selectedHero.attackPattern.find(coord => coord.x == (x) && coord.y == (y)) != null;
    }

    hasAssistancePattern(x:number, y:number){
        return this._selectedHero.assistancePattern.find(coord => coord.x == (x) && coord.y == (y)) != null;
    }

    selectMovePatternCase(x:number, y:number){
        if(x == 3 && y == 3) return;
        let pattern = this._selectedHero.movePattern.find(coord => coord.x == (x) && coord.y == (y));
        pattern ?
            this._selectedHero.movePattern.splice(this._selectedHero.movePattern.indexOf(pattern), 1) :
            this._selectedHero.movePattern.push(new Coordinate(x, y));
    }

    selectAttackPatternCase(x:number, y:number){
        if(x == 3 && y == 3) return;
        let pattern = this._selectedHero.attackPattern.find(coord => coord.x == (x) && coord.y == (y));
        pattern ?
            this._selectedHero.attackPattern.splice(this._selectedHero.attackPattern.indexOf(pattern), 1) :
            this._selectedHero.attackPattern.push(new Coordinate(x, y));
    }

    selectAssistancePatternCase(x:number, y:number){
        if(x == 3 && y == 3) return;
        let pattern = this._selectedHero.assistancePattern.find(coord => coord.x == (x) && coord.y == (y));
        pattern ?
            this._selectedHero.assistancePattern.splice(this._selectedHero.assistancePattern.indexOf(pattern), 1) :
            this._selectedHero.assistancePattern.push(new Coordinate(x, y));
    }

    fileChange(event) {
        /*let fileList: FileList = event.target.files;
         if(fileList.length > 0) {
         let file: File = fileList[0];
         let formData:FormData = new FormData();
         formData.append('uploadFile', file, file.name);
         let headers = new Headers();
         headers.append('Content-Type', 'multipart/form-data');
         headers.append('Accept', 'application/json');
         let options = new RequestOptions({ headers: headers });

         /*this.http.post(`${this.apiEndPoint}`, formData, options)
         .map(res => res.json())
         .catch(error => Observable.throw(error))
         .subscribe(
         data => console.log('success'),
         error => console.log(error)
         )
         }*/
    }
}
