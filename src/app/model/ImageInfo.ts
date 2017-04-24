/**
 * Created by LEBOC Philippe on 24/04/2017.
 */
export class ImageInfo {

    // Difference betwee, HERO and ITEM
    public entityType : string = 'hero';

    // Difference between ICON and IMAGE
    public imageType : string = 'image';

    // The entity identifier
    public entityId: string = null;

    // the default type
    public imageFormat : string = 'jpg';

    // Image url used for default image files
    public image : string = '';

    // Image base 64 encoded used for database stored images
    public imageB64 : string = null;

    constructor(entityType, imageType, entityId, format, image, imageB64) {
        this.entityType = entityType;
        this.imageType = imageType;
        this.entityId = entityId;
        this.imageFormat = format;
        this.image = image;
        this.imageB64 = imageB64;
    }
}
