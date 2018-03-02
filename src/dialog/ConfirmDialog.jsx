import Component from "../basic/Component";
import Button from "../button/Button";
import { Util } from 'rainbow-foundation-tools';
import config from "config";
import PropTypes from 'prop-types';

export default class ConfirmDialog extends Component {

    /**@ignore
     * Get dialog
     */
    static getDialog(dialogId) {
        return $("#" + dialogId);
    }

    /**@ignore
     * Add data to confirm dialog
     */
    static addData(dialogId, data) {
        this.getDialog(dialogId).attr("data-hiddenValue", JSON.stringify(data));
    }

    /**@ignore
     * Get data from confirm dialog
     */
    static getData(dialogId) {
        return JSON.parse(this.getDialog(dialogId).attr("data-hiddenValue"));
    }

    /**@ignore
     * Remove data from confirm dialog
     */
    static removeData(dialogId) {
        this.getDialog(dialogId).removeAttr("data-hiddenValue");
    }

    /**@ignore
     * Show dialog
     */
    static show(dialogId) {
        $("#" + dialogId + "_hiddenBtn").trigger("click", { status: "show" });
        this.getDialog(dialogId).modal("show");

        $(document.body).eq(0).addClass("modal-open-self").css("overflow", "hidden");
    }

    /**@ignore
     * Hide dialog
     */
    static hide(dialogId) {
        $("#" + dialogId + "_hiddenBtn").trigger("click", { status: "hide" });
        this.removeData(dialogId);
        this.getDialog(dialogId).modal("hide");

        $(document.body).eq(0).removeClass("modal-open-self").removeClass("modal-open").css("overflow", "auto");
        $("div.modal-backdrop.fade.in").remove();
    }

    /**@ignore
     * Toggle dialog
     */
    static toggle(dialogId) {
        $("#" + dialogId + "_hiddenBtn").trigger("click", { status: "toggle" });

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
            <div id={this.componentId} className={className} tabIndex="-1" role="dialog" data-keyboard={Util.parseBool(config.DOES_ESC_CLOSE_DIALOG) ? "true": "false" }
                aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop={this.props.backdrop}>
                <div className="modal-dialog" style={{ width: this.props.width, height: this.props.height }}>
                    {this.renderDialogContent()}
                </div>

                <button id={this.componentId + "_hiddenBtn"} type="button" style={{ display: 'none' }} />
            </div>
        );
    }

    /**@ignore
     * Render dialog content
     */
    renderDialogContent() {
        if (this.state.status == "show") {
            return (
                <div className="modal-content">
                    {this.renderDialogHeader()}

                    {this.renderDialogBody()}

                    {this.renderDialogButton()}
                </div>
            );
        }
    }

    /**@ignore
     * Render dialog header
     */
    renderDialogHeader() {
        let className = Util.parseBool(this.props.titleBackGround) ? "modal-header modal-header-color" : "modal-header";
        return (
            <div className={className}>
                {Util.parseBool(this.props.closeable) ? (
                    <button type="button" className="close" onClick={this.onClose.bind(this)}>&times;</button>) : null}
                <h4 className="modal-title" id="myModalLabel">{this.props.title ? this.getI18n(this.props.title) : ""}</h4>
            </div>
        );
    }

    //<span className="fa fa-exclamation-triangle fa-3x" style={{color: '#FFCC33'}}/>
    /**@ignore
     * Render dialog body
     */
    renderDialogBody() {
        return (
            <div className="modal-body">
                <div className={'alert alert-' + this.props.styleClass}>
                    {this.renderDialogIcon()}

                    <span id={this.componentId + "_msg"} style={{ verticalAlign: 'top', paddingLeft: '15px' }}>
                        {this.getMessage()}
                    </span>
                </div>
            </div>
        );
    }

    getMessage() {
        const messages = this.getI18n(this.getProperty("message"));
        if (Util.isArray(messages)) {
            var doms = [];
            $.each(messages, function (i, message) {
                doms.push(<div>{message}</div>);
            });

            return doms;
        } else {
            return messages;
        }
    }

    /**@ignore
     * Render dialog icon
     */
    renderDialogIcon() {
        switch (this.props.styleClass) {
            case ("success"):
                return (<span className="glyphicon glyphicon-ok-sign" />);
            case ("info"):
                return (<span className="glyphicon glyphicon-info-sign" />);
            case ("warning"):
                return (<span className="glyphicon glyphicon-question-sign" />);
            case ("danger"):
                return (<span className="glyphicon glyphicon-remove-sign" />);
            default:
                return <noscript />;
        }
    }

    /**@ignore
     * Render dialog button
     */
    renderDialogButton() {
        return (
            <div className="modal-footer">
                {Util.parseBool(this.props.confirmButton) ? (
                    <Button enabled={this.props.confirmEnabled} disabled={!this.props.confirmEnabled}
                        value={this.props.confirmText ? this.props.confirmText : 'Yes'} styleClass="primary"
                        onClick={this.onConfirm.bind(this)} />) : null}

                {Util.parseBool(this.props.cancelButton) ? (
                    <Button enabled={this.props.cancelEnabled} disabled={!this.props.cancelEnabled}
                        value={this.props.cancelText ? this.props.cancelText : 'No'} styleClass="primary"
                        onClick={this.onCancel.bind(this)} />) : null}

                {Util.parseBool(this.props.customerButton) ? (
                    <Button enabled={this.props.customerEnabled} disabled={!this.props.customerEnabled}
                        value={this.props.customerText ? this.props.customerText : 'Add'} styleClass="default"
                        onClick={this.onCustomerEvent.bind(this)} />) : null}

            </div>
        );
    }

    componentDidMount() {
        var _self = this;

        $("#" + this.componentId + "_hiddenBtn").click(function (event, data) {
            event.preventDefault();

            if (data.status == "toggle") {
                if (_self.state.status == "show") {
                    _self.setState({ status: "hide" });
                } else {
                    _self.setState({ status: "show" });
                }
            } else {
                _self.setState({ status: data.status });
            }
        });
    }

    onConfirm() {
        if (this.props.onConfirm != undefined) {
            this.props.onConfirm.call();
        } else {
            ConfirmDialog.hide(this.componentId);
        }
    }

    onCancel() {
        if (this.props.onCancel != undefined) {
            this.props.onCancel.call();
        } else {
            ConfirmDialog.hide(this.componentId);
        }
    }

    onCustomerEvent() {
        if (this.props.onCustomerEvent != undefined) {
            this.props.onCustomerEvent.call();
        }
    }

    onClose() {
        if (this.props.onClose != undefined) {
            this.props.onClose.call();
        } else {
            ConfirmDialog.hide(this.componentId);
        }
    }

};


/**@ignore
 * ConfirmDialog component prop types
 */
ConfirmDialog.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    //modal: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    styleClass: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    //backdrop: PropTypes.oneOf(['static', 'true', 'false']),
    //keyboard: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    customerText: PropTypes.string,
    confirmButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    cancelButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    customerButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    closeable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    confirmEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    cancelEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    customerEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

    // confirm dialog event
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    onCustomerEvent: PropTypes.func,
    titleBackGround: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    className: PropTypes.string
};

/**@ignore
 * Get confirmDialog component default props
 */
ConfirmDialog.defaultProps = {
    modal: true,
    width: "500px",//"auto !important",
    height: "auto !important",
    backdrop: "static",
    confirmButton: true,
    cancelButton: true,
    customerButton: false,
    closeable: true,
    confirmText: "Yes",
    cancelText: "No",
    customerText: "Add",
    styleClass: "info",
    confirmEnabled: true,
    cancelEnabled: true,
    customerEnabled: true,
    titleBackGround: false,
    className: ''
};
