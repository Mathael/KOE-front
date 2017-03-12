import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {GameConfigTemplate} from "../model/GameConfigTemplate";

@Injectable()
export class GameConfigService {

    constructor(private http:Http) {}

    remove(id:string): Observable<boolean> {
        return this
            .http
            .delete(`/api/gameconfig/${id}`)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    findAll() : Observable<GameConfigTemplate[]> {
        return this
            .http
            .get('/api/gameconfig')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(config) : Observable<boolean> {
        return this
            .http
            .put('/api/gameconfig', config)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    create (body: GameConfigTemplate): Observable<GameConfigTemplate> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this
            .http
            .post('/api/gameconfig', body, options)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
