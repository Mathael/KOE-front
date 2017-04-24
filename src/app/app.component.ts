import {Component, OnInit, ViewChild} from '@angular/core';
import {Notification} from "./model";
import {NotificationService} from "./service";

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [NotificationService]
})
export class AppComponent implements OnInit {

    @ViewChild('noty')
    private noty : any;

    constructor(private notificationService:NotificationService) {}

    ngOnInit(): void {
        this.notificationService.notificationElement = this.noty;
        this.notificationService.test();
    }

    getNotification() : Notification {
        return NotificationService.notification;
    }
}
