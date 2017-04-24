import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UploadService} from "../../service/upload-service.service";
import {ImageInfo} from "../../model";

@Component({
    selector: 'app-editor-image',
    templateUrl: './editor-image.component.html',
    styleUrls: ['./editor-image.component.css'],
    providers: [UploadService]
})
export class EditorImageComponent implements OnInit {

    @Input()
    private _imageInfo : ImageInfo = null;

    @ViewChild('image')
    private _imageFile = null;

    private _imageSafe: SafeUrl;

    constructor(private uploadService:UploadService, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        if(this._imageInfo.imageB64) this._imageSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/'+this._imageInfo.imageFormat+';base64,'+this._imageInfo.imageB64);
    }

    uploadFile() {
        let fi = this._imageFile.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            let data = new FormData();
            data.append("file", fileToUpload);

            this.uploadService
                .upload(this._imageInfo.entityType, this._imageInfo.entityId, this._imageInfo.imageType, data)
                .subscribe(res => {
                    if(res) {
                        //this._entity = res;
                        if(this._imageInfo.imageB64) this._imageSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/'+this._imageInfo.imageFormat+';base64,'+this._imageInfo.imageB64);
                    }
                });
        }
    }
}
