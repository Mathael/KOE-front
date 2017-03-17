import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Hero} from "../../model";
import {UploadService} from '../../service'

@Component({
    selector: 'app-hero-editor-image',
    templateUrl: './hero-editor-image.component.html',
    styleUrls: ['./hero-editor-image.component.css'],
    providers: [UploadService]
})
export class HeroEditorImageComponent implements OnInit {

    @Input()
    private _hero: Hero = null;

    @ViewChild('image')
    private _imageFile = null;

    @ViewChild('icon')
    private _iconFile = null;

    constructor(private uploadService:UploadService) {}

    ngOnInit() {}

    uploadFile(type:string) {
        let input : any = type == 'icon' ? this._iconFile : this._imageFile;
        let fi = input.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            let data = new FormData();
            data.append("file", fileToUpload);

            this.uploadService
                .upload(this._hero.id, type, data)
                .subscribe(res => console.log(res));
        }
    }
}
