import {ValidatorContext} from "rainbow-foundation-cache";
import I18NUtil from "../i18n/I18NUtil";
import {ELUtil} from 'rainbow-foundation-tools';
import r18n from "../i18n/reactjs-tag.i18n";

var InputValidator = {

	validate: function(component){
		let validator = {};

		// handler requried validator
		if(ELUtil.parseBoolValue(component._required)){
			validator = $.extend({}, validator, {
				notEmpty: {
					message: this.getRequiredMessage(component)
				}
			});
		}

		// handler min length and max length validator
		if(component.props.minLength || component.props.maxLength){
			if(component.props.subType!="UINumber"){
				if(component.props.pattern != undefined){
					ValidatorContext.putValidator(component.getValidationGroup(), component.componentId, {
						callback: {
							message: this.getMinMaxLengthMessage(component),
							callback: function(value, validator) {
								let minLength = parseInt(component.props.minLength);
								let maxLength = parseInt(component.props.maxLength);

								value = value.replace(/-/g, "").replace(/_/g, "");

								if(minLength > value.length || maxLength < value.length){
									return false;
								}
								return true;
							}
						}
					});
				} else {
					validator = $.extend({}, validator, {
						stringLength: {
							min: component.props.minLength,
							max: component.props.maxLength,
							message: this.getMinMaxLengthMessage(component)
						}
					});
				}
			}
		}

		/*if(false && (component.props.maxValue || component.props.minValue)){
			console.log(component.componentId + "==" + component.props.maxValue + "===" + component.props.minValue);
			validators = $.extend({}, validators, {
				between: {
					min: component.props.minValue,
					max: component.props.maxValue,
					message: "The value must be more than " + component.props.minValue + " and less than " + component.props.maxValue
				},
				digits: {
					message: 'The office phone number is not valid'
				}
			})
		}

		if(false){
			validators = $.extend({}, validators, {
				regExp: {
					regExp: '/^[a-zA-Z0-9_]+$/',
					message: 'The username can only consist of alphabetical, number and underscore'
				}
			})
		}*/

		ValidatorContext.putValidator(component.getValidationGroup(), component.componentId, validator);
	},

	/**@ignore
	 * Get required message
	 */
	getRequiredMessage: function(component){
		if (component.props.requiredMessage) {
			return component.props.requiredMessage;
		} else {
			if (component.props.validationLabel != undefined) {
				return I18NUtil.format(r18n.InputValidator.RequiredMessage, component.props.validationLabel);
			}
			return I18NUtil.format(r18n.InputValidator.RequiredMessage, component.props.label);
		}
	},

	/**@ignore
	 * Get min length and max length message
	 */
	getMinMaxLengthMessage: function(component){
		let minLengthMessage = component.props.minLengthMessage;
		let maxLengthMessage = component.props.maxLengthMessage;

		if(minLengthMessage == undefined && maxLengthMessage == undefined){
			if (component.props.minLength != undefined && component.props.maxLength == undefined) {
				return I18NUtil.format(r18n.InputValidator.MinLengthMessage, component.props.minLength);
			} else if (component.props.minLength == undefined && component.props.maxLength != undefined) {
				return I18NUtil.format(r18n.InputValidator.MaxLengthMessage, component.props.maxLength);
			} else if (component.props.minLength != undefined && component.props.maxLength != undefined) {
				return I18NUtil.format(r18n.InputValidator.LengthMessage, component.props.minLength, component.props.maxLength);
			}
		} else {
			let message = "";
			message = (minLengthMessage != undefined) ? (message + minLengthMessage + "<br/>") : message;
			message = (maxLengthMessage != undefined) ? (message + maxLengthMessage) : message;
			return message;
		}
	}

};

module.exports = InputValidator;
