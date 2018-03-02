import Component from "../basic/Component";
import r18n from '../i18n/reactjs-tag.i18n';
import {Util} from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class DropZone extends Component {

    /**@ignore
     * Get DropZone
     */
    static getDropZone(dropZoneId) {
        return Dropzone.forElement("#" + dropZoneId);
    }

    /**@ignore
     * Upload files
     */
    static upload(dropZoneId) {
        this.getDropZone(dropZoneId).processQueue();
    }

    /**@ignore
     * All accepted files
     */
    static getAcceptedFiles(dropZoneId) {
        return this.getDropZone(dropZoneId).getAcceptedFiles();
    }

    /**@ignore
     * All rejected files
     */
    static getRejectedFiles(dropZoneId) {
        return this.getDropZone(dropZoneId).getRejectedFiles();
    }

    /**@ignore
     * All queued files
     */
    static getQueuedFiles(dropZoneId) {
        return this.getDropZone(dropZoneId).getQueuedFiles();
    }

    /**@ignore
     * All uploading files
     */
    static getUploadingFiles(dropZoneId) {
        return this.getDropZone(dropZoneId).getUploadingFiles();
    }

    render() {
        return (
            <div id={this.componentId} className="dropzone"
                 style={{width: this.props.width, height: this.props.height, border: "1px dashed #2196f3"}}>

            </div>
        );
    }

    componentDidMount() {
        this.handlerComponent();
    }

    componentDidUpdate() {
        let url = this.getURL();
        DropZone.getDropZone(this.componentId).options.url = url;

        if (sessionStorage.getItem("Authorization") != null) {
            DropZone.getDropZone(this.componentId).options.headers = {'Authorization': 'Bearer ' + sessionStorage.getItem("Authorization").substr(13).split("&")[0]};
        }
    }

    handlerComponent() {
        var _self = this;

        // Prevent Dropzone from auto discovering this element
        Dropzone.options.myAwesomeDropzone = false;
        // This is useful when you want to create the
        // Dropzone programmatically later

        // Disable auto discover for all elements
        Dropzone.autoDiscover = false;

        var headersToken = null;
        if (sessionStorage.getItem("Authorization") != null) {
            headersToken = {'Authorization': 'Bearer ' + sessionStorage.getItem("Authorization").substr(13).split("&")[0]};
        }

        $("#" + this.componentId).dropzone({
            url: this.getURL(),
            method: "post",
            parallelUploads: this.props.parallelUpload,
            maxFilesize: this.props.maxFileSize,
            filesizeBase: 1000,
            //paramName: [],
            uploadMultiple: false,
            //headers
            headers: headersToken,
            addRemoveLinks: true,
            //previewsContainer
            clickable: Util.parseBool(this.props.clickable),
            //createImageThumbnails
            //maxThumbnailFilesize
            //thumbnailWidth
            //thumbnailHeight
            maxFiles: this.props.maxFile,
            //resize
            //init
            acceptedFiles: this.props.acceptFile,
            //accept
            autoProcessQueue: Util.parseBool(_self.props.autoUpload),

            //change the previewTemplate to use Bootstrap progress bars
            //<div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n
            //previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n<div class=\"dz-details\">\n<div class=\"dz-filename\"><span data-dz-name></span></div>\n<div class=\"dz-size\" data-dz-size></div>\n<img data-dz-thumbnail />\n</div>\n<div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n<div class=\"dz-success-mark\"><span>BBB</span></div>\n<div class=\"dz-error-mark\"><span>AAAA</span></div>\n</div>",
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n<div class=\"dz-details\">\n<div class=\"dz-filename\"><span data-dz-name></span></div>\n<div class=\"dz-size\" data-dz-size></div>\n<img data-dz-thumbnail />\n</div>\n<div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n<div class=\"dz-success-mark\">\n<svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n<title>Check</title>\n<defs></defs>\n<g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n<path style=\"fill:#00ff00;\" d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n</g>\n</svg>\n</div>\n<div class=\"dz-error-mark\">\n<svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n<title>Error</title>\n<defs></defs>\n<g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n<g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n<path style=\"fill:#ff0000;\" d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n</g>\n</g>\n</svg>\n</div>\n</div>",

            //previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n<div class=\"dz-image\"><img data-dz-thumbnail /></div>\n<div class=\"dz-details\">\n<div class=\"dz-size\"><span data-dz-size></span></div>\n<div class=\"dz-filename\"><span data-dz-name></span></div>\n</div>\n<div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n<div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n<div class=\"dz-success-mark\">\n<svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n<title>Check</title>\n<defs></defs>\n<g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n<path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n</g>\n</svg>\n</div>\n<div class=\"dz-error-mark\">\n<svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n<title>Error</title>\n<defs></defs>\n<g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n<g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n<path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n</g>\n</g>\n</svg>\n</div>\n</div>",
            forceFallback: false,
            //fallback


            // To translate dropzone, you can also provide these options
            dictDefaultMessage: this.props.defaultMessage ? this.getI18n(this.props.defaultMessage) : r18n.DropZone.dictDefaultMessage,
            dictFallbackMessage: r18n.DropZone.dictFallbackMessage,
            dictFallbackText: r18n.DropZone.dictFallbackText,
            dictInvalidFileType: (this.props.fileTypeErrorMsg !== undefined) ? this.props.fileTypeErrorMsg : r18n.DropZone.dictInvalidFileType,
            dictFileTooBig: r18n.DropZone.dictFileTooBig,
            dictResponseError: r18n.DropZone.dictResponseError,
            dictCancelUpload: r18n.DropZone.dictCancelUpload,
            dictCancelUploadConfirmation: r18n.DropZone.dictCancelUploadConfirmation,
            dictRemoveFile: r18n.DropZone.dictRemoveFile,
            dictMaxFilesExceeded: r18n.DropZone.dictMaxFilesExceeded,


            init: function () {
                _self.handlerErrorEvent(this);

                _self.hanlderRemoveFileEvent(this);

                _self.hanlderAddFileEvent(this);

                _self.hanlderSuccessEvent(this);

                _self.hanlderCompleteEvent(this);

                this.on("maxfilesexceeded", function (file) {
                    console.log("No more files please!");
                });
            }
        });
    }

    /**@ignore
     * Handler error event
     */
    handlerErrorEvent(dropzone) {
        var _self = this;
        dropzone.on("error", function (file, message) {
            if (_self.props.onError != undefined) {
                _self.props.onError.call(file, message);
            }
        });
    }

    /**@ignore
     * Handler remove file event
     */
    hanlderRemoveFileEvent(dropzone) {
        var _self = this;
        dropzone.on("removedfile", function (file) {
            if (_self.props.onRemoveFile != undefined) {
                _self.props.onRemoveFile.call();
            }
        });
    }

    /**@ignore
     * Handler add file event
     */
    hanlderAddFileEvent(dropzone) {
        var _self = this;
        dropzone.on("addedfile", function (file) {
            if (_self.props.onAddFile != undefined) {
                _self.props.onAddFile.call();
            }
        });
    }

    /**@ignore
     * Handler success event
     */
    hanlderSuccessEvent(dropzone) {
        var _self = this;
        dropzone.on("success", function (file, data) {
            if (_self.props.onSuccess != undefined) {
                _self.props.onSuccess.call(file, data);
            }
        });
    }

    /**@ignore
     * Handler complete event
     */
    hanlderCompleteEvent(dropzone) {
        var _self = this;
        dropzone.on("complete", function (file) {
            if (_self.props.onComplete != undefined) {
                _self.props.onComplete.call();
            }
        });
    }

};


/**@ignore
 * DropZone component prop types
 */
DropZone.propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    paramName: PropTypes.object,
    //districtMessage: PropTypes.string,
    acceptFile: PropTypes.string,
    maxFile: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxFileSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    parallelUpload: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    autoUpload: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    clickable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    fileTypeErrorMsg: PropTypes.string,

    onError: PropTypes.func,
    onRemoveFile: PropTypes.func,
    onAddFile: PropTypes.func,
    onSuccess: PropTypes.func,
    onComplete: PropTypes.func
};

/**@ignore
 * Get DropZone component default props
 */
DropZone.defaultProps = {
    width: '100%',
    height: 'auto !important',
    //districtMessage: "Drop files here to upload",
    acceptFile: null, // eg: ".jpg,.png,.gif,.bmp,.jpeg,.JPG,.PNG,.GIF,.BMP,.JPEG" ,
    maxFile: 10,
    maxFileSize: 512, // MB
    parallelUpload: 100,
    autoUpload: true,
    paramName: null,
    clickable: true,
};
