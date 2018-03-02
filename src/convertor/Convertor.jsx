var ConvertorConstant = require("./ConvertorConstant");
var DateTimePickerConvertor = require("./DateTimePickerConvertor");
var DigitConvertor = require("./DigitConvertor");
var PercentConvertor = require("./PercentConvertor");
var TextConvertor = require("./TextConvertor");
var TextareaConvertor = require("./TextareaConvertor");

var Convertor = {

    getAsObject: function (convertor, component, value) {
        value = this.getAsObjectValue(value);

        if (convertor != null && convertor != undefined) {
            switch (convertor) {
                case (ConvertorConstant.DATETIMEPICKER_CONVERTOR):
                    return DateTimePickerConvertor.getAsObject(component, value);
                case (ConvertorConstant.DIGIT_CONVERTOR):
                    return DigitConvertor.getAsObject(component, value);
                case (ConvertorConstant.PERCENT_CONVERTOR):
                    return PercentConvertor.getAsObject(component, value);
                case (ConvertorConstant.PERMILLAGE_CONVERTOR):
                    return PercentConvertor.getAsObject(component, value);
                case (ConvertorConstant.TEXT_CONVERTOR):
                    return TextConvertor.getAsObject(component, value);
                case (ConvertorConstant.TEXTAREA_CONVERTOR):
                    return TextareaConvertor.getAsObject(component, value);
                default:
                    return value;
            }
        }

        return value
    },

    getAsString: function (convertor, component, value) {
        value = this.getAsStringValue(value);

        if (convertor != null) {
            switch (convertor) {
                case (ConvertorConstant.DATETIMEPICKER_CONVERTOR):
                    return DateTimePickerConvertor.getAsString(component, value);
                case (ConvertorConstant.DIGIT_CONVERTOR):
                    return DigitConvertor.getAsString(component, value);
                case (ConvertorConstant.PERCENT_CONVERTOR):
                    return PercentConvertor.getAsString(component, value);
                case (ConvertorConstant.PERMILLAGE_CONVERTOR):
                    return PercentConvertor.getAsString(component, value);
                case (ConvertorConstant.TEXT_CONVERTOR):
                    return TextConvertor.getAsString(component, value);
                case (ConvertorConstant.TEXTAREA_CONVERTOR):
                    return TextareaConvertor.getAsString(component, value);
                default:
                    return value;
            }
        }

        return value;
    },

    getAsObjectValue: function (value) {
        if (value == "" || value == undefined) {
            return null;
        }
        return value;
    },

    getAsStringValue: function (value) {
        //console.log("==getAsStringValue==" + value);
        if (value == null || value == undefined) {
            return "";
        }
        return value;
    }

}

module.exports = Convertor;
