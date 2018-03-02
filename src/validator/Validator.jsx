import ValidatorConstant from "./ValidatorConstant";
import InputValidator from "./InputValidator";
import EmailValidator from "./EmailValidator";
import DigitValidator from "./DigitValidator";
import {Util} from "rainbow-foundation-tools";

var Validator = {
	
	validate: function(validator, component){
		if(!Util.parseBool(component["props"]["isValidation"])){
				return false;
		}
		if(validator != null && validator != undefined){
				switch(validator){
					case (ValidatorConstant.INPUT_VALIDATOR):
						InputValidator.validate(component);
						break;
						
					case (ValidatorConstant.EMAIL_VALIDATOR):
						EmailValidator.validate(component);
						break;
						
					case (ValidatorConstant.DIGIT_VALIDATOR):
						DigitValidator.validate(component);
						break;
						
					default:
						break;
				}
		}
	}
	
};

module.exports = Validator;
