import {Injectable, OnInit} from '@angular/core';
import {Notification} from "../model";

@Injectable()
export class NotificationService implements OnInit{

    public static notification : Notification = new Notification();

    public notificationElement : any;

    constructor() {}

    ngOnInit(): void {
        console.log('Notification service initialized');
    }

    show() : void {
        this.notificationElement.show();
    }

    test() : void {
        NotificationService.notification.body = 'Les notifications sont activées !';
        this.show();
    }
}
