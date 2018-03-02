import Input from "../basic/Input";
import ValidatorConstant from '../validator/ValidatorConstant';
import { Util } from 'rainbow-foundation-tools';

export default class Email extends Input {

    renderInput() {
        return (
            <div className="input-group">
                <input id={this.componentId} name={this.getName()} type="text" className="form-control"  style={this.props.style}
                title={this.getI18n(this.props.title)} placeholder={this.props.placeHolder} data-auto-test={this.getNameForTest()}/>
				<span className="input-group-addon pickerposition">
					<span className="glyphicon glyphicon-envelope"/>
				</span>
            </div>
        );
    }

    getValidatorId() {
        return ValidatorConstant.EMAIL_VALIDATOR;
    }

    componentDidUpdate(nextProps, nextState) {
        super.componentDidUpdate(nextProps, nextState);
        this.clearValidationInfo(nextProps);
    }

    clearValidationInfo(nextProps){
        const inputObject =  $("#" + this.componentId);
        if(Util.parseBool(nextProps.required)&&inputObject.val()){
            inputObject.parent().parent().next().remove();
            const errorInputObject = inputObject.closest(".form-group");
            if(errorInputObject.hasClass("has-error")){
                inputObject.closest(".input-group").css("border", "2px solid #E1E8EE");
            };
        }
    }

};

Email.propTypes = $.extend({}, Input.propTypes, {
    
});
Email.defaultProps = $.extend({}, Input.defaultProps, {
    
});
