import { NumberUtil, Util } from 'rainbow-foundation-tools';
import ConvertorConstant from './ConvertorConstant';
var PercentConvertor = {

    getAsObject: function (component, value) {
        if (value != "" && value != null && value != undefined) {
            //let formatValue = component.formatDigit(component.canonicalDigit(value));
            value = value.replace(/[^0-9\.]/g, "");
            //eg: 33.55->0.3355, 5.55->0.0555
            //let result = NumberUtil.divide(value,  parseInt(component.props.limit));
            //let result = parseFloat(value / parseInt(component.props.limit));
            let result;
            if (component.getConvertorId() == ConvertorConstant.PERMILLAGE_CONVERTOR) {
                result = this.numScale(value, -3);
            } else {
                result = this.numScale(value, -2);
            }
            if (Util.parseBool(component.props.isRounding)) {
                return parseFloat(result.toFixed(parseInt(component.decimalPrecision) + 2));
            } else {
                return parseFloat(result.toString().substr(0, parseInt(component.decimalPrecision) + 4));
            }


        }
        return null;
    },

    getAsString: function (component, value) {
        let result;
        if (value != "" && value != null && value != undefined) {
            if (component.getConvertorId() == ConvertorConstant.PERMILLAGE_CONVERTOR) {
                result = NumberUtil.multiply(value, 1000);
            } else {
                result = NumberUtil.multiply(value, 100);
            }
            return component.formatDigit(component.canonicalDigit(result));
        }

        return value;
    },

    numScale: function (value, m) {
        let parts = value.toString().split('.');
        const integerLen = parts[0].length;
        const decimalLen = parts[1] ? parts[1].length : 0;

        if (m > 0) {
            let zeros = m - decimalLen;
            while (zeros > 0) {
                zeros -= 1;
                parts.push(0);
            }
        } else {
            let zeros = Math.abs(m) - integerLen;
            while (zeros > 0) {
                zeros -= 1;
                parts.unshift(0);
            }
        }
        let index = integerLen + m;
        parts = parts.join('').split('');
        parts.splice(index > 0 ? index : 0, 0, '.');

        return parseFloat(parts.join(''));
    }

};

module.exports = PercentConvertor;