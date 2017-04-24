import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../service";
import {Item, Stat, ImageInfo} from "../../model";

@Component({
    selector: 'app-item-editor',
    templateUrl: './item-editor.component.html',
    styleUrls: ['./item-editor.component.css'],
    providers : [ItemService]
})
export class ItemEditorComponent implements OnInit {

    private _selectedItem = null;
    private _items : Item[] = [];

    constructor(private itemService:ItemService) {}

    ngOnInit() {
        this
            .itemService
            .findAll()
            .subscribe(
                items => this._items = items,
                err => console.error(err)
            )
    }

    selectItem(item : Item) : void {
        if(!item) return;
        this._selectedItem = item;
    }

    create() : void {
        this._selectedItem = new Item();
    }

    getSelectedItemImageInfo() : ImageInfo {
        return new ImageInfo('item', 'item', this._selectedItem.id, 'png', this._selectedItem.image, this._selectedItem.imageB64);
    }

    statsValidator(stats:Stat[]) : boolean {
        let total = stats.map(stat => stat.value).reduce((a,b) => a + b, 0);
        return total === 0;
    }

    statsChangeFunction(stats:Stat[], stat:Stat, value:number) : void {
        stat.value += value;
    }
}
