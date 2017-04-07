import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Hero} from "../model/Hero";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class HeroService implements OnInit{

    private headers = new Headers({ 'Content-Type': 'application/json', 'Accept' : 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    ngOnInit(): void {
        console.log('HeroService initialized');
    }

    constructor(private http:Http) {}

    remove(id:string): Observable<boolean> {
        return this
            .http
            .delete(`/api/hero/${id}`, this.options)
            .debounceTime(800)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    findAll() : Observable<Hero[]> {
        return this
            .http
            .get('/api/hero', this.options)
            .debounceTime(800)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(hero) : Observable<boolean> {
        return this
            .http
            .put('/api/hero', hero, this.options)
            .debounceTime(800)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create (body: Hero): Observable<Hero> {
        return this
            .http
            .post('/api/hero', body, this.options)
            .debounceTime(1000)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
