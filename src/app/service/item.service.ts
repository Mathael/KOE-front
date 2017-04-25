import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Item} from "../model";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ItemService {

    constructor(private http:Http) {}

    remove(id:string): Observable<boolean> {
        return this
            .http
            .delete(`/api/item/${id}`)
            .debounceTime(800)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    findAll() : Observable<Item[]> {
        return this
            .http
            .get('/api/item')
            .debounceTime(800)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(item) : Observable<boolean> {
        return this
            .http
            .put('/api/item', item)
            .debounceTime(800)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create (body: Item): Observable<Item> {
        //let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this
            .http
            .post('/api/item', body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
