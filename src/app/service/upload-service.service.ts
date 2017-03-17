import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class UploadService {

    constructor(private http: Http) {}

    upload(fileType: string, heroId : string, file: any) {
        return this.http.post(`/api/upload/${fileType}/${heroId}`, file);
    }
}
