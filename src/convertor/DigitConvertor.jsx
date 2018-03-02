import { Util } from "rainbow-foundation-tools"
 
var DigitConvertor = {
    getAsObject: function (component, value) {
        if (value) {
            let roundValue = this.getRounding(component,value);
            value = component.getDigitValue(component.canonicalDigit(roundValue));
            return parseFloat(value);
        } else {
            return null;
        }
    },
 
 
    getAsString: function (component, value) {
        let roundValue = this.getRounding(component, value);
        return component.formatDigit(component.canonicalDigit(roundValue));
    },
 
 
    /**@ignore
     * rounding -> eg: 123.448 ==> 123.45
     * rounding -> eg: 123.443 ==> 123.44
     */
    getRounding(component, value) {
        const {isRounding, decimalPrecision} = component.props;
        if(!Number.isNaN(value) && value !== null && value !== "" && value !== undefined){
            const comma = value.toString().indexOf(',');
            if(comma){
                value = value.toString().replace(/\,/g,"");
            }
            if(Util.parseBool(isRounding)){
                if (!decimalPrecision) {
                    console.error('Please define decimalPrecision property in component.');
                    return null;
                }
                value = parseFloat(Math.round(value * Math.pow(10, decimalPrecision)) / Math.pow(10, decimalPrecision));
            }else {
                const dot = value.toString().indexOf('.');
                if(dot!=-1){
                    value = parseFloat(value).toString().substr(0, dot + parseInt(decimalPrecision) + 1);
                }  
            }   
            return value;
        }
        return null;
    }, 
};
module.exports = DigitConvertor;