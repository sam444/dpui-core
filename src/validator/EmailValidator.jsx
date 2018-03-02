import {ValidatorContext} from "rainbow-foundation-cache";
import r18n from "../i18n/reactjs-tag.i18n";

var EmailValidator = {
	
	validate: function(component){
		ValidatorContext.putValidator(component.getValidationGroup(), component.componentId, {
			emailAddress: {
				message: r18n.EmailValidator
			}
		});
	}
	
};

module.exports = EmailValidator;
