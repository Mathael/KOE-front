import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
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

    private _imageSafe: SafeUrl;
    private _iconSafe: SafeUrl;

    constructor(private uploadService:UploadService, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        if(this._hero.imageB64) this._imageSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+this._hero.imageB64);
        if(this._hero.iconB64) this._iconSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+this._hero.iconB64);
    }

    uploadFile(type:string) {
        let input : any = type == 'icon' ? this._iconFile : this._imageFile;
        let fi = input.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            let data = new FormData();
            data.append("file", fileToUpload);

            this.uploadService
                .upload(this._hero.id, type, data)
                .subscribe(res => {
                    if(res) {
                        this._hero = res;
                        if(this._hero.imageB64) this._imageSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+this._hero.imageB64);
                        if(this._hero.iconB64) this._iconSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,'+this._hero.iconB64);
                    }
                });
        }
    }
}
