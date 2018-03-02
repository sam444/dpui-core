import Command from "../basic/Command";
import PropTypes from 'prop-types';

export default class Button extends Command {
    renderComponent() {

        let buttonClassName = this.getStyleClass() + " " + this.getSize() + " " + (this.getDisabled() ? this.getDisabled() + ' ' : ' ')  + (this.props.proClass? this.props.proClass : '')
        if (this.props.role == "button") {
            return (
                <button id={this.componentId} title={this.getI18n(this.props.title)}
                    className={buttonClassName}
                    disabled={this.getDisabled()} type={this.props.type}
                    onClick={this.onClick.bind(this)}
                    style={this.props.style != null && this.props.style != undefined ? this.props.style : null}
                    data-dismiss={this.props.buttonType == "cancel" ? "modal" : null} data-auto-test={this.getNameForTest()}>
                    {this.renderIcon()}
                    {this.renderImage()}
                    <span style={{ display: 'inblock', marginLeft: '5px' }}>{this.getProperty("value") ? this.getI18n(this.getProperty("value")) : null}</span>
                </button>
            );
        } else if (this.props.role == "link") {
            return (
                <a href="javascript: void(0);" title={this.getI18n(this.props.title)} className={this.getStyleClass()} data-auto-test={this.getNameForTest()}
                    role="button" disabled={this.getDisabled()} onClick={this.onClick.bind(this)}>
                    {this.props.value}
                </a>
            );
        }
    }

    getStyleClass() {
        switch (this.props.styleClass) {
            case (/*this.DEFAULT*/"default"):
                return "btn btn-default";
            case (/*this.PRIMARY*/"primary"):
                return "btn btn-primary";
            case (/*this.SUCCESS*/"success"):
                return "btn btn-success";
            case (/*this.INFO*/"info"):
                return "btn btn-info";
            case (/*this.WARNING*/"warning"):
                return "btn btn-warning";
            case (/*this.DANGER*/"danger"):
                return "btn btn-danger";
            case (/*this.LINK*/"link"):
                return "btn btn-link";
            case (undefined):
                return "btn btn-primary";
            default:
                return this.props.styleClass;
        }
    }




};




Button.propTypes = $.extend({}, Command.propTypes, {
    role: PropTypes.oneOf(["button", "link"]),
    type: PropTypes.oneOf(["button", "submit"]),
    causeValidation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    validationGroup: PropTypes.string,
    update: PropTypes.string,
    exceptValidationGroup: PropTypes.string,
    uppercase: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    title: PropTypes.string,
    proClass: PropTypes.string
});

/**@ignore
 * Get Button component default props
 */
Button.defaultProps = $.extend({}, Command.defaultProps, {
    role: "button",
    causeValidation: false,
    uppercase: true,
    proClass: null
});
