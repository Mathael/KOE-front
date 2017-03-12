import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Hero} from "../model/Hero";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class HeroService implements OnInit{

    ngOnInit(): void {
        console.log('HeroService initialized');
    }

    constructor(private http:Http) {}

    remove(id:string): Observable<boolean> {
        return this
            .http
            .delete(`/api/hero/${id}`)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    findAll() : Observable<Hero[]> {
        return this
            .http
            .get('/api/hero')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(hero) : Observable<boolean> {
        return this
            .http
            .put('/api/hero', hero)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create (body: Hero): Observable<Hero> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this
            .http
            .post('/api/hero', body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
