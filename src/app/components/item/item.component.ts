import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../service";
import {Item} from "../../model";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css'],
    providers: [ItemService]
})
export class ItemComponent implements OnInit {

    private items:Item[] = [];

    constructor(private itemService:ItemService) {}

    ngOnInit() {
        this
            .itemService
            .findAll()
            .subscribe(
                items => this.items = items,
                error => console.log(error)
            );
    }
}
