import Component from "../basic/Component";
import config from "config";
import {Util} from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Dialog extends Component {

    /**@ignore
     * Get dialog
     */
    static getDialog(dialogId) {
        return $("#" + dialogId);
    }

    /**@ignore
     * Show dialog
     */
    static show(dialogId) {
        $("#" + dialogId + "_hiddenBtn").trigger("click", {status: "show"});
        this.getDialog(dialogId).modal("show");
        $(document.body).eq(0).addClass("modal-open-self").css("overflow", "hidden");
    }

    /**@ignore
     * Hide dialog
     */
    static hide(dialogId, autoOverflow = true) {
        $("#" + dialogId + "_hiddenBtn").trigger("click", {status: "hide"});
        this.getDialog(dialogId).modal("hide");

        if (autoOverflow) {
            $(document.body).eq(0).removeClass("modal-open-self").css("overflow", "auto");
        }
    }

    /**@ignore
     * Toggle dialog
     */
    static toggle(dialogId) {
        $("#" + dialogId + "_hiddenBtn").trigger("click", {status: "toggle"});
        this.getDialog(dialogId).modal("toggle");
    }

    constructor(props) {
        super(props);

        this.state = {
            status: "hide"
        };
    }

  

    render() {
        let className = 'modal fade ' + this.props.className;
        return (
            <div id={this.componentId} className={className} tabIndex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true" data-keyboard={Util.parseBool(config.DOES_ESC_CLOSE_DIALOG) ? "true": "false"}
                 data-backdrop={this.props.backdrop} data-show="true">
                <div className="modal-dialog" style={{width: this.props.width, height: this.props.height}}>
                    {this.renderDialogContent()}
                </div>
                <button id={this.componentId + "_hiddenBtn"} type="button" style={{display: "none"}}/>
            </div>
        );
    }

    /**@ignore
     * Render dialog header
     */
    renderDialogHeader() {
        let className = Util.parseBool(this.props.titleBackGround) ? "modal-header modal-header-color" : "modal-header";
        return (
            <div className={className}>
                {
                    Util.parseBool(this.props.closeable) ?
                        <button type="button" className="close" onClick={this.onCloseDialog.bind(this)}>&times;</button> :
                        null
                }
                <h4 className="modal-title">{this.props.title?this.getI18n(this.props.title):""}</h4>
            </div>
        );
    }

    /**@ignore
     * Render dialog content
     */
    renderDialogContent() {
        if (this.state.status == "show") {
            let dialogArray = this.getDialogArray();

            return (
                <div className="modal-content">
                    {this.renderDialogHeader()}
                    <div className="modal-body">{dialogArray[0]}</div>
                    {dialogArray[1]}
                </div>
            );
        }
    }

    /**@ignore
     * Get dialog content and footer element
     */
    getDialogArray() {
        let dialogArray = [[], []];

        React.Children.forEach(this.props.children, function (child) {
            if (child.props.componentType == "DialogFooter") {
                dialogArray[1].push(child);
            } else {
                dialogArray[0].push(child);
            }
        });

        return dialogArray;
    }

    componentDidMount() {
        let _self = this;

        $("#" + this.componentId + "_hiddenBtn").click(function (event, data) {
            event.preventDefault();

            if (data.status == "toggle") {
                if (_self.state.status == "show") {
                    _self.setState({status: "hide"});
                } else {
                    _self.setState({status: "show"});
                }
            } else {
                _self.setState({status: data.status});
            }
        });
    }

    onCloseDialog() {
        if (this.props.onClose != undefined) {
            this.props.onClose.call();
        }

        Dialog.hide(this.componentId);
    }

};


/**@ignore
 * Dialog component prop types
 */
Dialog.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    modal: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    backdrop: PropTypes.oneOf(["static", "true", "false"]),
    keyboard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    closeable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onClose: PropTypes.func,
    titleBackGround: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    className: PropTypes.string
};

/**@ignore
 * Get dialog component default props
 */
Dialog.defaultProps = {
    modal: true,
    width: "auto !important",
    height: "auto !important",
    backdrop: "static",
    closeable: true,
    titleBackGround: false,
    className: ''
};
