import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class EventManager {

    private _events:{ [key:string]:Function[] } = {};

    subscribe(event:string, callback:Function) {
        console.log('trying to subscribe to event...', event);
        if(this._events[event]) this._events[event].push(callback);
    }

    publish(event) {
        console.log('publish an event', event);
        if(this._events[event]) this._events[event].forEach((func) => func());
    }
}
