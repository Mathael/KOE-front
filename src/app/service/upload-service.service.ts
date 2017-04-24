import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Hero} from "../model/Hero";
import {Observable} from "rxjs";

@Injectable()
export class UploadService {

    constructor(private http: Http) {}

    upload(entityType : string, entityId : string, fileFormat: string, file: any) : Observable<Hero> {
        return this
            .http
            .post(`/api/upload/${entityType}/${entityId}/${fileFormat}`, file)
            .map(response => response.json())
            .debounceTime(1000)
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
