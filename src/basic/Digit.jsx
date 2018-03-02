import Input from "./Input";
import ConvertorConstant from '../convertor/ConvertorConstant';
import ValidatorConstant from '../validator/ValidatorConstant';
import { ELUtil, Util } from "rainbow-foundation-tools";
import DigitConvertor from '../convertor/DigitConvertor';
import PropTypes from 'prop-types';

export default class Digit extends Input {

	componentWillMount() {
		super._componentWillMount();

		this.initFormat();
		this.initGroup();
		this.initAllowChars();

		this.onEvent = { newValue: this.getComponentValue(), oldValue: null };
	}

	/*componentDidMount(){
		super._componentDidMount();

		if(this.props.io != "out"){
			//this.init();
			this.initEvent();
			this.initProperty();
			this.initValidator();
			this.initComponent();

			ComponentContext.put(this.componentId, this);
		}
	}*/

	initEvent() {
		//console.log("-----init------");
		//this.initFormat();
		//this.initGroup();
		//this.initAllowChars();
		super.initEvent();
		this.initDigitEvent();

		this.lastValue = $("#" + this.componentId).val();
	}

	initDigitEvent() {
		let _self = this;

		// Init change event
		//$("#" + this.clientId).change(function(event){
		//	let _passed = _self.validate();
		//	if(_passed && _self.lastValue !== _self.clientObj.val()){
		//	}
		//});

		// Init blur event
		$("#" + this.componentId).blur(function (event) {
			let value = null;
			if (_self.validate()) {
				let val = $("#" + _self.componentId).val().replace(/^\s+|\s+$/g, '');
				value = _self.formatDigit(val);
			}

			$("#" + _self.componentId).val(value);
		});


		// Init keypress event
		$("#" + this.componentId).keypress(function (event) {
			if (!event.ctrlKey) {
				_self.handleForceNumber(event);
			}
		});


		// Init focus event
		$("#" + this.componentId).focus(function (event) {
			let value = _self.removeGroupSeparator($("#" + _self.componentId).val());
			$("#" + _self.componentId).val(value);
			_self.lastValue = value;
		});
	}

	initFormat() {
		let format = this.props.format;
		if (format != null && format != undefined) {
			let model = this.getDigitModel(format);
			if (model != null) {
				this.decimalPrecision = (this.props.decimalPrecision != null && this.props.decimalPrecision != undefined) ? this.props.decimalPrecision : model.decimalPrecision;
				this.digitGroup = model.digitGroup;
				this.decimalSeparator = model.decimalSeparator;
				this.allowDecimal = (this.props.allowDecimal != null && this.props.allowDecimal != undefined) ? this.props.allowDecimal : model.allowDecimal;
			}
		}
	}

	/**@ignore
	 * Init Group information
	 * eg: ###,###,### -> groupSeparator, groupSize, allowGroup
	 */
	initGroup() {
		let digitGroup = this.digitGroup;
		if (digitGroup) {
			let i = 0;
			for (i = 0; i < digitGroup.length; i++) {
				if (digitGroup.charAt(i) !== "#") {
					this.groupSeparator = digitGroup.charAt(i);
					this.groupSize = i;
					break;
				}
			}

			if (i == digitGroup.length) {
				this.allowGroup = false;
			} else {
				this.allowGroup = true;
			}
		} else {
			this.allowGroup = false;
		}
	}

	/**@ignore
	 * Init allow chars
	 */
	initAllowChars() {
		let allowChars = this.props.baseChars;
		if (Util.parseBool(this.allowDecimal)) {
			allowChars += this.decimalSeparator;
		}
		if (Util.parseBool(this.props.allowNegative)) {
			allowChars += this.props.minusSign;
		}
		this.allowChars = allowChars;
	}

	/**@ignore
	 * Validate
	 */
	validate() {
		let value = $("#" + this.componentId).val().replace(/^\s+|\s+$/g, '');
		if (value.length < 1) {
			return true;
		}

		let numValue = this.removeGroupSeparator(value);
		//Check if all of the characters are allowed
		let re = new RegExp("[^" + this.allowChars + "]");
		if (numValue.match(re)) {
			return false;
		}

		//Check if it has a negative symbol
		if (!Util.parseBool(this.props.allowNegative)) {
			if (numValue.indexOf("-") !== -1) {
				return false;
			}
		}

		//Check if it's a number
		/*if(isNaN(numValue)){
			return false;
		}*/
		if (Util.parseBool(this.allowDecimal) && value.indexOf(this.decimalSeparator) != value.lastIndexOf(this.decimalSeparator)) {
			return false;
		}

		return true;
	}

	handleForceNumber(event) {
		let which = event.which;
		//allow "backspace" in non-IE browsers
		/*if(!$.browser.msie){
			if(which === 8 || which === 0){
				return;
			}
		}*/
		if (this.allowChars.indexOf(String.fromCharCode(which)) === -1) {
			event.preventDefault();
		}
	}

	/**@ignore
	 * According to a format of the data, get a real data.
	 * eg: 123,456.7890 -> 123456.78
	 */
	getDigitValue(value) {

		if (value == null || value == undefined) {
			return null;
		}

		//if (value.length < 1){
		//	return value
		//}

		value = this.removeGroupSeparator(value);
		if (isNaN(value)) {
			return null;
		}
		value = this.retainDecimal(value);
		value = this.handlerLeftZero(value);

		return value;
	}

	/**@ignore
	 * Format Digit
	 */
	formatDigit(value) {
		//value = this.removeGroupSeparator(value);
		//value = this.retainDecimal(value);
		//value = this.handlerLeftZero(value);
		value = this.getDigitValue(value);
		//Group and righ pad zero if enabled
		if (value == null || value == undefined) {
			return null;
		}
		if (value.length < 1) {
			return value
		}
		if (this.allowGroup) {
			value = this.padRightZero(this.insertGroupSeparator(value));
		} else {
			value = this.padRightZero(value.replace(/\./g, this.decimalSeparator));
		}
		return value;
	}

	/**@ignore
	 * Retain decimal
	 */
	retainDecimal(value) {
		const { isRounding } = this.props;
		if (Util.parseBool(this.allowDecimal)) {
			let index = value.indexOf(this.decimalSeparator);
			let length = index + parseInt(this.decimalPrecision) + 1;

			if (index != -1 && value.length > length) {
				if (Util.parseBool(isRounding)) {
					value = DigitConvertor.getAsObject(this, value);
				} else {
					value = value.substr(0, length);
				}
			}
		}
		return value;
	}

	/**@ignore
	 * Handler left zero
	 */
	handlerLeftZero(value) {
		value = String(value);

		// .12345 -> 0.12345
		if (value.charAt(0) == this.decimalSeparator) {
			return "0" + value;
		}

		// -00012345 -> -12345.00
		let minusSign = "";
		if (value.charAt(0) == this.props.minusSign) {
			minusSign = value.charAt(0);
			value = value.substr(1, value.length);
		}
		let i = 0;
		for (i = 0; i < value.length; i++) {
			let char = value.charAt(i);
			if (char != '0' && char != this.groupSeparator) {
				break;
			}
		}

		if (parseInt(value.charAt(i)) >= 1 && parseInt(value.charAt(i)) <= 9) {
			return minusSign + value.substr(i, value.length);
		} else {
			return minusSign + value.substr(i - 1, value.length);
		}
	}

	/**@ignore
	 * Pad right zero for digit, eg: 123.1 ==> 123.100
	 */
	padRightZero(value) {
		let decimalSeparator = this.decimalSeparator;
		let decimalPrecision = this.decimalPrecision;

		if (Util.parseBool(this.allowDecimal)) {
			if (value.indexOf(decimalSeparator) > -1) {
				let array = value.split(decimalSeparator);
				let digital = array[array.length - 1];
				let digitalLength = digital.length;

				while (Util.parseBool(this.props.autoPadRightZero) && digitalLength < decimalPrecision) {
					value += '0';
					digitalLength++;
				}
			} else {
				if (decimalPrecision > 0) {
					value += decimalSeparator;
				}

				let digitalLength = 0;
				while (Util.parseBool(this.props.autoPadRightZero) && digitalLength < decimalPrecision) {
					value += '0';
					digitalLength++;
				}
			}
		}

		return value;
	}

	/**@ignore
	 * Insert group separator -> eg: 123123123.22 ==> 123,123,123.22
	 */
	insertGroupSeparator(value) {
		let negative = value.indexOf(this.props.minusSign) != -1;
		if (negative) {
			value = value.substring(1);
		}
		let dsIndex = value.indexOf(this.decimalSeparator);
		let length = (dsIndex != -1) ? dsIndex : value.length;

		// eg: 1.1234
		if (dsIndex > 0 && dsIndex < this.groupSize) {
			value = value.replace(/\./g, this.decimalSeparator);
			return negative ? this.props.minusSign + value : value;
		}

		let slices = [];
		for (let i = length; i > 0; i -= this.groupSize) {
			slices.unshift(value.substring(i - this.groupSize, i));
		}

		let result = slices.join(this.groupSeparator).concat(value.substring(length).replace(/\./g, this.decimalSeparator));
		return negative ? this.props.minusSign + result : result;
	}

	/**@ignore
	 * Remove group separator -> eg: 123,123,123.22 ==> 123123123.22
	 */
	removeGroupSeparator(value) {
		if (this.allowGroup) {
			let gsReg = new RegExp("\\" + this.groupSeparator, "g");
			return String(value).replace(gsReg, '');
		}
		return value;
	}

	/**@ignore
	 * Get digit model by format
	 */
	getDigitModel(format) {
		if (format != null && format != undefined) {
			let decimalPrecision = 0;
			let digitGroup = null;
			let decimalSeparator = null;
			let allowDecimal = false;

			let separatorIndex = this.getSeparatorIndex(format);
			let precisionIndex = this.getPrecisionIndex(format);

			if (separatorIndex == precisionIndex) {
				if (separatorIndex == -1 && precisionIndex == -1) {
					digitGroup = format;
				} else {
					// It's separator
					decimalPrecision = format.length - precisionIndex - 1;
					digitGroup = format.substr(0, precisionIndex);
					decimalSeparator = format.charAt(precisionIndex);
				}
			} else {
				let separatorChar = format.charAt(separatorIndex);
				let precisionChar = format.charAt(precisionIndex);

				if (separatorChar != precisionChar) {
					decimalPrecision = format.length - precisionIndex - 1;
					decimalSeparator = precisionChar;
				}
				digitGroup = format.substr(0, precisionIndex);
			}

			if (decimalPrecision != 0 && decimalSeparator != null) {
				allowDecimal = true;
			}

			return {
				"decimalPrecision": decimalPrecision,
				"digitGroup": digitGroup,
				"decimalSeparator": decimalSeparator,
				"allowDecimal": allowDecimal
			};
		}
		return null;
	}

	/**@ignore
	 * Get Separator index
	 */
	getSeparatorIndex(format) {
		for (let i = 0; i < format.length; i++) {
			if (format.charAt(i) != '#') {
				return i;
			}
		}
		return -1;
	}

	/**@ignore
	 * Get precision index
	 */
	getPrecisionIndex(format) {
		for (let i = format.length - 1; i >= 0; i--) {
			if (format.charAt(i) != '#') {
				return i;
			}
		}
		return -1;
	}

	/**@ignore
	 * Canonical digit
	 */
	canonicalDigit(value) {
		if (value != null && value != undefined) {
			let gsReg = new RegExp("\\,", "g");
			let dsReg = new RegExp("\\.", "g");

			return String(value).replace(gsReg, "").replace(dsReg, this.decimalSeparator);
		}
		return value;
	}

	initValue() {
		$("#" + this.componentId).val(this.formatDigit(this.canonicalDigit(this.getComponentValue())));
	}

	getOutputValue() {
		return this.formatDigit(this.canonicalDigit(this.getComponentValue()));
	}

	getConvertorId() {
		return ConvertorConstant.DIGIT_CONVERTOR;
	}

	getValidatorId() {
		return ValidatorConstant.DIGIT_VALIDATOR;
	}

};

/**@ignore
 * Digit component prop types
 */
Digit.PropTypes = $.extend({}, Input.propTypes, {
	minValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	maxValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	minValueMessage: PropTypes.string,
	maxValueMessage: PropTypes.string,
	isRounding: PropTypes.bool,
	decimalPrecision: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	allowDecimal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	allowNegative: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	autoPadRightZero: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
});

/**@ignore
 * Get digit component default props
 */
Digit.defaultProps = $.extend({}, Input.defaultProps, {
	baseChars: "0123456789",
	minusSign: "-",
	//groupSeparator: ",",
	//decimalSeparator: ".",
	//groupSize: 3,
	decimalPrecision: 2,
	//allowDecimal: true,
	allowNegative: false,
	isRounding:false,
	autoPadRightZero: true
});
