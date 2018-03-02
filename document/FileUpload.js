/**
 * @module FileUpload 
 */

export default class FileUpload{
    /** 
    * @description
    * <div class="exapmle" data-module="fileUpload" data-example='[{"all":"480-1190"}]'></div>
    * @property {string}  url	                 - 	Define the elements upload url.
    * @property {string}  width                  - 	Define the elements width.
    * @property {string}  height             - 	Define the elements height.
    * @property {string} paramName                - Define the elements upload param.
    * @property {string}  acceptFile              - 	Define the elements received file type, such as .jpg,.png,.gif,.bmp,.jpeg,.JPG,.PNG,.GIF,.BMP,.JPEG.
    * @property {number}  maxFile              - 	Define the elements max how many files to upload, the default is 10.
    * @property {number}  maxFileSize              - Define the elements max upload files size, the default is 512MB.
    * @property {number}  parallelUpload              - 	Define the elements how many files to upload visit once API.
    * @property {boolean}  autoUpload              - Defines whether an element automatically access API, the default is true.
    * @property {boolean}  clickable              - 	Defines whether the element can click.
    * @property {function}  onError              - 	Define the elements upload error the triggered event.
    * @property {function}  onRemoveFile              - 	Define the elements delete file the triggered event.
    * @property {function}  onAddFile              - 		Define the elements upload successfully the triggered event.
    * @property {number}  onSuccess              - Define the elements max upload files size, the default is 512MB.
    * @property {number}  onComplete              - 	Define the elements upload finishes the triggered event.
    * @property {string}  fileTypeErrorMsg              - Define the error message displayed when the file type is not accepted.
    * @property {function}  getDropZone              - 	Get DropZone object. 	UIDropZone.getDropZone(id)
    * @property {function}  upload              - 			Get the need to manually upload the file. 	UIDropZone.upload(id)
    * @property {function}  getAcceptedFiles              - 	Get the accepted file. 	UIDropZone.getAcceptedFiles(id)
    * @property {function}  getRejectedFiles              - 		Get the rejected file. UIDropZone.getRejectedFiles(id)
    * @property {function}  getQueuedFiles              - 		Get the queuing file. UIDropZone.getQueuedFiles(id)
    * @property {function}  getUploadingFiles              - 		Get the uploading file. UIDropZone.getUploadingFiles(id)

    */
    example(){
        
    }
};



