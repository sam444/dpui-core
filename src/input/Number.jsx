import Digit from "../basic/Digit";
import config from "config";
import { Util } from "rainbow-foundation-tools";
import PropTypes from 'prop-types';

export default class Number extends Digit {

	renderInput(){
		if(this.props.prefixIcon != undefined || this.props.suffixIcon != undefined || this.props.prefixText != undefined || this.props.suffixText != undefined){
			return (
				<div className="input-group">
					{this.renderPrefixText()}
					{this.renderPrefixIcon()}
					{this.renderInputElement()}
					{this.renderSuffixIcon()}
					{this.renderSuffixText()}
				</div>
			);
		} else {
			return this.renderInputElement();
		}
	}

	/**@ignore
	 * Render input element
	 */
	renderInputElement(){
		return (
			<input id={this.componentId} name={this.getName()} type="type" className="form-control"
				   placeholder={this.props.placeHolder} data-auto-test={this.getNameForTest()} 
				   style={this.props.style} data-max-length={this.props.maxLength}/>
		);
	}

	/**@ignore
	 * Render prefix icon
	 */
	renderPrefixIcon(){
		if(this.props.prefixIcon != undefined){
			return (
				<span className="input-group-addon fixleftposition">
					<span id={this.componentId + "_prefixIcon"} className={this.props.prefixIcon} style={{cursor: "pointer"}} onClick={this.onPrefixIconClick.bind(this)} />
				</span>
			);
		}
		return <noscript/>;
	}

	/**@ignore
	 * Render suffix icon
	 */
	renderSuffixIcon(){
		if(this.props.suffixIcon != undefined){
			return (
				<span className="input-group-addon fixalliconposition">
					<span id={this.componentId + "_suffixIcon"} className={this.props.suffixIcon} style={{cursor: "pointer"}} onClick={this.onSuffixIconClick.bind(this)} />
				</span>
			);
		}
		return <noscript/>;
	}

	/**@ignore
	 * Render prefix text
	 */
	renderPrefixText(){
		if(this.props.prefixText != undefined){
			return (
				<span className="input-group-addon fixleftposition">
					<span>{this.props.prefixText}</span>
				</span>
			);
		}
		return <noscript/>;
	}

	/**@ignore
	 * Render suffix text
	 */
	renderSuffixText(){
		if(this.props.suffixText != undefined){
			return (
				<span className="input-group-addon fixalliconposition">
					<span>{this.props.suffixText}</span>
				</span>
			);
		}
		return <noscript/>;
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
 * Number component prop types
 */
Number.PropTypes = $.extend({}, Digit.propTypes, {
	componentType:PropTypes.string
});

/**@ignore
 * Get Number component default props
 */
Number.defaultProps = $.extend({}, Digit.defaultProps, {
	format: config.DEFAULT_NUMBER_FORMAT,
	style: {textAlign:'right'},
	subType:"UINumber",
	componentType: "number"
});
