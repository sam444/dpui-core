import Command from "../basic/Command";
import PropTypes from 'prop-types';

export default class Link extends Command {

    renderComponent() {
        const aProps = Object.assign({}, this.props);
        delete aProps.enabled;
        delete aProps.visibled;
        delete aProps.styleClass;
        delete aProps.causeValidation;
        const value = this.getProperty("value");
        const outputValue = value ? this.getI18n(value) : "";
        const title = this.getProperty("title");
        const outputTitle = title ? this.getI18n(title) : "";

        return (
            <a {...aProps} title={this.props.title ? outputTitle : ''} href="javascript: void(0);" data-auto-test={this.getNameForTest()}
                onClick={this.onClick.bind(this)} disabled={this.props.disabled}
                style={this.props.style != null && this.props.style != undefined ? this.props.style : null}
                className={this.getDisabled()}>
                <div className={this.props.iconClass} style={{ display: "inline" }}>
                    {
                        this.props.icon ?
                            <span className={this.props.icon} style={{ paddingRight: "5px" }} /> :
                            null
                    }
                </div>
                <span className="icon_end"
                    style={{ padding: "0px", marginRight: "0", textDecoration: "underline" }}>{outputValue}</span>
                {this.props.children}
            </a>
        )
    }

};

/**@ignore
 * Link component prop types
 */
Link.propTypes = $.extend({}, Command.propTypes, {
    update: PropTypes.string,
    causeValidation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    validationGroup: PropTypes.string,
    exceptValidationGroup: PropTypes.string,
    title: PropTypes.string
});

/**@ignore
 * Get Link component default props
 */
Link.defaultProps = $.extend({}, Command.defaultProps, {
    causeValidation: false
});
