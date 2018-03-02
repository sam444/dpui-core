import {ValidatorContext} from "rainbow-foundation-cache";
import I18NUtil from "../i18n/I18NUtil";
import r18n from "../i18n/reactjs-tag.i18n";

var DigitValidator = {

	validate: function(component){
		if(component.props.minValue || component.props.maxValue){
			ValidatorContext.putValidator(component.getValidationGroup(), component.componentId, {
				/*between: {
					min: component.props.minValue,
					max: component.props.maxValue,
					message: "The value must be more than " + component.props.minValue + " and less than " + component.props.maxValue
				}*/
				callback: {
					message: this.getMinMaxValueMessage(component),
					callback: function(value, validator) {
						// If value is null or "", validate pass
						if(value == null || value == ""){
							return true;
						}

						let minValue = parseFloat(component.props.minValue);
						let maxValue = parseFloat(component.props.maxValue);
						value = component.getDigitValue(component.canonicalDigit(value));
						if(minValue > value || maxValue < value){
							return false;
						}
						return true;

						/*value = parseInt(value, 10);
						let year = validator.getFieldElements('expYear').val(),
							currentMonth = new Date().getMonth() + 1,
							currentYear  = new Date().getFullYear();
						if (value < 0 || value > 12) {
							return false;
						}
						if (year == '') {
							return true;
						}
						year = parseInt(year, 10);
							if (year > currentYear || (year == currentYear && value > currentMonth)) {
								validator.updateStatus('expYear', 'VALID');
								return true;
							} else {
								return false;
							}
						}*/
					}
				}
			});
		}
	},

	/**@ignore
	 * Get min value and max value message
	 */
	getMinMaxValueMessage: function(component){
		let minValueMessage = component.props.minValueMessage;
		let maxValueMessage = component.props.maxValueMessage;

		if(minValueMessage == undefined && maxValueMessage == undefined){
			if (component.props.minValue != undefined && component.props.maxValue == undefined) {
				return I18NUtil.format(r18n.DigitValidator.MinValueMessage, component.props.minValue);
			} else if (component.props.minValue == undefined && component.props.maxValue != undefined) {
				return I18NUtil.format(r18n.DigitValidator.MaxValueMessage, component.props.maxValue);
			} else if (component.props.minValue != undefined && component.props.maxValue != undefined) {
				return I18NUtil.format(r18n.DigitValidator.ValueMessage, component.props.minValue, component.props.maxValue);
			}
		} else {
			let message = "";
			message = (minValueMessage != undefined) ? (message + minValueMessage + "<br/>") : message;
			message = (maxValueMessage != undefined) ? (message + maxValueMessage) : message;
			return message;
		}
	}

};

module.exports = DigitValidator;
