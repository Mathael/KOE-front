import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../service";
import {Item, Stat, ImageInfo} from "../../model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-item-editor',
    templateUrl: './item-editor.component.html',
    styleUrls: ['./item-editor.component.css'],
    providers : [ItemService]
})
export class ItemEditorComponent implements OnInit {

    private _selectedItem = null;
    private _items : Item[] = [];

    private _imageSafe : SafeUrl = null;

    constructor(private itemService:ItemService, private sanitizer: DomSanitizer) {}

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
        this._imageSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+this._selectedItem.imageB64);
    }

    create() : void {
        this._selectedItem = new Item();
    }

    validateCreation() : void {
        if(!this._selectedItem) return;
        this
            .itemService
            .create(this._selectedItem)
            .subscribe(newItem => {
                if(newItem) this._items.push(newItem)
            });
    }

    save() : void {
        if(!this._selectedItem) {
            console.error('Selected item is undefined');
            return;
        }

        // Detect creation
        if(!this._selectedItem.id) {
            this.validateCreation();
            return;
        }

        this
            .itemService
            .update(this._selectedItem)
            .subscribe(data => console.log(data));
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
