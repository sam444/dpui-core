import Input from "../basic/Input";
import Param from "../basic/Param";
import OnChangeEvent from '../event/OnChangeEvent';
import config from "config";
import {Util} from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Switch extends Input {

	renderInput(){
		return (
			<input id={this.componentId} name={this.getName()} type="checkbox" style={this.props.style} title={this.getI18n(this.props.title)}
				   data-auto-test={this.getNameForTest()} />
		);
	}

	componentDidUpdate(prevProps, prevState) {
		this.initProperty();
		this.initValidator();
		this.initComponent();
	}

	initValue(){
		let value = this.getComponentValue();
		document.getElementById(this.componentId).checked = (Switch.ON_VALUE == value) ? "checked" : null;
	}

	initComponent(){
		let _self = this;
		$("#" + this.componentId).bootstrapSwitch("destroy");
		$("#" + this.componentId).bootstrapSwitch({
			size: this.getSize(),
			onColor: this.props.onColor,
			offColor: this.props.offColor,
			onText: this.props.onText,
			offText: this.props.offText,
			animate: Util.parseBool(this.props.animate),
			//state: this.getComponentValue() == Switch.ON_VALUE ? true : false,

			onInit: function(){
				//console.log("===onInit===");
			},

			onSwitchChange: function(event){
				//console.log("===onSwitchChange===");
				_self.setComponentValue(event);
                _self.onEvent = {newValue: value, oldValue: _self.onEvent.newValue};
                let value = _self.getInputValue(event);

                let valueChangeEvent = new OnChangeEvent(_self, event, Param.getParameter(_self), value, _self.onEvent.newValue);

                if (_self.props.onChange) {
                   _self.props.onChange(valueChangeEvent);
                }
			},

			destroy: function(){
				console.log("===destroy===");
			}
		})
	}

	getSize(){
		switch(this.props.size){
			case "lg":
				return "large";
			case "sm":
				return "small";
			case "xs":
				return "mini";
			default:
				return "mini";
		}
	}

	getInputValue(event){
		return $("#" + this.componentId).is(":checked") ? Switch.ON_VALUE : Switch.OFF_VALUE;
	}

};

// handler switch on value & off value
Switch.ON_VALUE = config.DEFAULT_BOOLEAN_VALUE.TRUE;
Switch.OFF_VALUE = config.DEFAULT_BOOLEAN_VALUE.FALSE;

/**@ignore
 * Switch component prop types
 */
Switch.propTypes = $.extend({}, Input.propTypes, {
	onColor: PropTypes.oneOf(["default", "primary", "success", "info", "warning", "danger"]),
	offColor: PropTypes.oneOf(["default", "primary", "success", "info", "warning", "danger"]),
	onText: PropTypes.string,
  	offText: PropTypes.string,
	size: PropTypes.oneOf(["lg", "sm", "xs"]),
	animate: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
});

/**@ignore
 * Switch component prop types
 */
Switch.defaultProps = $.extend({}, Input.defaultProps, {
	onColor: "primary",
	offColor: "default",
	onText: "ON",
  	offText: "OFF",
  	size: null,
  	animate: true,
  	defaultValue: Switch.OFF_VALUE,
	isValidation:"false"
});
