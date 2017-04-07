import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from "../../service";
import {Item, Hero} from "../../model";

@Component({
    selector: 'app-hero-editor-item',
    templateUrl: './hero-editor-item.component.html',
    styleUrls: ['./hero-editor-item.component.css'],
    providers: [ItemService]
})
export class HeroEditorItemComponent implements OnInit {

    @Input()
    private _hero:Hero;
    private _items:Item[] = [];

    constructor(private itemService:ItemService) {}

    ngOnInit() : void {
        this
            .itemService
            .findAll()
            .subscribe(
                items => this._items = items,
                error => console.error(error)
            );
    }

    selectItem(itemId:string) : void {
        if(!this._hero) return;
        this._hero.item = this._items.find(item => item.id === itemId);
    }
}
