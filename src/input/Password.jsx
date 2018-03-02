import Input from "../basic/Input";
import {Util} from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Password extends Input {

    constructor(props) {
        super(props);

        this.state = {
            showPassword: false
        };
    }

    renderInput() {
        if (!Util.parseBool(this.props.showPassword)) {
            return this.renderInputPassword();
        } else if (this.state.showPassword) {
            return (<div className="input-group">{this.renderInputText()}{this.renderIcon()}</div>);
        } else {
            return (<div className="input-group">{this.renderInputPassword()}{this.renderIcon()}</div>);
        }
    }

    renderInputText() {
        return (
                <input id={this.componentId} name={this.getName()} type="text" className="form-control" style={this.props.style}
                       placeholder={this.props.placeHolder} title={this.getI18n(this.props.title)} data-auto-test={this.getNameForTest()}/>
        );
    }

    renderInputPassword() {
        return (

                <input id={this.componentId} name={this.getName()} type="password" className="form-control"
                       placeholder={this.props.placeHolder} title={this.getI18n(this.props.title)} data-auto-test={this.getNameForTest()}/>
        );
    }

    renderIcon() {
        if (this.state.showPassword) {
            return (
                <span className="input-group-addon pickerposition">
					<span className="glyphicon glyphicon-eye-open" onClick={this.onCloseShowPassword.bind(this)}
                          style={{cursor: "pointer"}}/>
				</span>
            );
        } else {
            return (
                <span className="input-group-addon pickerposition">
					<span className="glyphicon glyphicon-eye-close" onClick={this.onOpenShowPassword.bind(this)}
                          style={{cursor: "pointer"}}/>
				</span>
            );
        }
    }

    onOpenShowPassword() {
        this.setState({showPassword: true});
    }

    onCloseShowPassword() {
        this.setState({showPassword: false});
    }

    componentDidUpdate(nextProps, nextState) {
        super.componentDidUpdate(nextProps, nextState);
        this.clearValidationInfo(nextProps);
    }

    clearValidationInfo(nextProps){
        const inputObject =  $("#" + this.componentId);
        if(Util.parseBool(nextProps.required)&&inputObject.val()){
            inputObject.parent().next().remove();
            const errorInputObject = inputObject.closest(".form-group");
            if(errorInputObject.hasClass("has-error")){
                inputObject.css("border", "2px solid #E1E8EE");
            };
        }
    }

};


/**@ignore
 * Password component prop types
 */
Password.propTypes = $.extend({}, Input.propTypes, {
    showPassword: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
});

/**@ignore
 * Get Password component default props
 */
Password.defaultProps = $.extend({}, Input.defaultProps, {
    showPassword: false
});
