import Input from "../basic/Input";
import Param from "../basic/Param";
import MessageHelper from '../basic/MessageHelper';
import r18n from '../i18n/reactjs-tag.i18n';
import { StringUtil } from "rainbow-foundation-tools";
import OnClickEvent from '../event/OnClickEvent';
import ConvertorConstant from '../convertor/ConvertorConstant';
import { Util } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Text extends Input {


	static showPopover(textId) {
		$("#popvoer" + textId).show();
	}

	static hidePopover(textId) {
		$("#popvoer" + textId).hide();
	}

	renderInput() {
		if (this.props.prefixIcon != undefined || this.props.suffixIcon != undefined
			|| this.props.prefixText != undefined || this.props.suffixText != undefined) {
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

	hidenPopover() {
		$("#popvoer" + this.componentId).hide();
	}

	/**@ignore
	 * Render input element
	 */
	renderInputElement() {
		let style = "form-control " + this.props.className;

		if (this.props.children&&this.props.children.props['componentType']!="Param") {
			let result = [];
			result.push(<input id={this.componentId} name={this.getName()} type="text" maxLength={this.props.maxLength} data-toggle="tooltip" data-placement="bottom" data-trigger="hover"
						className={style} placeholder={this.getI18n(this.props.placeHolder)} data-original-title={this.getI18n(this.props.title)} style={this.props.style}
						data-auto-test={this.getNameForTest()} />);
			result.push(<div>{this.props.children ? <div id={"popvoer" + this.componentId} className="input-popover"><span onClick={this.hidenPopover.bind(this)}>X</span>{this.props.children}</div> : <noscript />}</div>);	
			return result;
		} else {
			return (
				<input id={this.componentId} name={this.getName()} type="text" maxLength={this.props.maxLength} data-toggle="tooltip" data-placement="bottom" data-trigger="hover"
					className={style} placeholder={this.getI18n(this.props.placeHolder)} data-original-title={this.getI18n(this.props.title)} style={this.props.style}
					data-auto-test={this.getNameForTest()} />
			);
		}
	}

	/**@ignore
	 * Render prefix icon
	 */
	renderPrefixIcon() {
		if (this.props.prefixIcon != undefined) {
			return (
				<span className="input-group-addon fixleftposition">
					<span id={this.componentId + "_prefixIcon"} className={this.props.prefixIcon} style={{ cursor: "pointer" }} onClick={this.onPrefixIconClick.bind(this)} />
				</span>
			);
		}
		return <noscript />;
	}

	/**@ignore
	 * Render suffix icon
	 */
	renderSuffixIcon() {
		if (this.props.suffixIcon != undefined) {
			return (
				<span className="input-group-addon fixalliconposition">
					<span id={this.componentId + "_suffixIcon"} className={this.props.suffixIcon} style={{ cursor: "pointer" }} onClick={this.onSuffixIconClick.bind(this)} />
				</span>
			);
		}
		return <noscript />;
	}

	/**@ignore
	 * Render prefix text
	 */
	renderPrefixText() {
		if (this.props.prefixText != undefined) {
			return (
				<span className="input-group-addon fixleftposition">
					<span>{this.props.prefixText}</span>
				</span>
			);
		}
		return <noscript />;
	}

	/**@ignore
	 * Render suffix text
	 */
	renderSuffixText() {
		if (this.props.suffixText != undefined) {
			return (
				<span className="input-group-addon fixalliconposition">
					<span>{this.props.suffixText}</span>
				</span>
			);
		}
		return <noscript />;
	}

	getOutputValue() {
		let value = this.getComponentValue();

		if (this.props.mask != null && this.props.mask != undefined) {
			value = StringUtil.mask(value, this.props.mask);
		}

		if (this.props.pattern != undefined && value != undefined && value != null) {
			value = Inputmask(this.props.pattern).format(value)
		}

		return value;
	}

	initEvent() {
		super.initEvent();

		if (this.props.io != "out") {
			let _self = this;

			$("#" + this.componentId).keypress(function (event) {
				if (!event.ctrlKey) {
					_self.handlerAllowChars(event);
				}
			});

			$("#" + this.componentId).change(function (event) {
				_self.handlerOnChangeAllowChars(event);
				_self.handlerClearBlank(event);
				_self.handlerUpperLowerCase(event);
				_self.setComponentValue(event);
			});
		}
	}

	initComponent() {
		if (this.props.pattern != undefined) {
			//$("#" + this.componentId).mask(this.props.pattern);
			$("#" + this.componentId).inputmask(this.props.pattern);
		}
	}

	/**@ignore
	 * Handler to upper or lower case
	 */
	handlerUpperLowerCase(event) {
		if (this.props.toUpperLowerCase != undefined) {
			let { toUpperLowerCase } = this.props;
			let input = this.getComponent();

			if (toUpperLowerCase == "upper") {
				input.val(input.val().toUpperCase());
			} else if (toUpperLowerCase == "lower") {
				input.val(input.val().toLowerCase());
			}
		}
	}

	/**@ignore
	 * Handler clear blank
	 */
	handlerClearBlank(event) {
		if (this.props.clearBlank != undefined) {
			let { clearBlank } = this.props;
			let component = this.getComponent();
			let value = component.val();

			if (clearBlank == "left") {
				value = value.replace(/(^\s*)/g, "")
			} else if (clearBlank == "right") {
				value = value.replace(/(\s*$)/g, "");
			} else if (clearBlank == "both") {
				value = value.replace(/(^\s*)|(\s*$)/g, "");
			} else if (clearBlank == "all") {
				value = value.replace(/\s/g, "");
			}

			component.val(value);
		}
	}

	/**@ignore
	 * Hanlder keypress event allow chars
	 */
	handlerAllowChars(event) {
		if (this.props.allowChars != undefined) {
			let allowChars = String(this.props.allowChars);
			let which = event.which;

			if (StringUtil.isRegex(this.props.allowChars)) {
				let regex = eval(allowChars.replace(/\/\//g, "\/"));

				if (!regex.exec(String.fromCharCode(which))) {
					event.preventDefault();
				}
			} else {
				if (allowChars.indexOf(String.fromCharCode(which)) === -1) {
					event.preventDefault();
				}
			}
		}
	}

	/**@ignore
	 * Handler change event allow chars
	 */
	handlerOnChangeAllowChars(event) {
		if (this.props.allowChars != undefined) {
			let allowChars = String(this.props.allowChars);
			let component = this.getComponent();
			let value = component.val();

			if (StringUtil.isRegex(this.props.allowChars)) {
				let regex = eval(allowChars.replace(/\/\//g, "\/"));

				if (regex.exec(value)) {
					component.val(this.onEvent.newValue);
				} else {
					component.val("");
					if (this.props.errorMessage) {
						MessageHelper.error(this.props.errorMessage, null, MessageHelper.POSITION_TOP_RIGHT);
					} else {
						MessageHelper.error(r18n.MSG_REGULAR_EXPRESSION_ERROR, null, MessageHelper.POSITION_TOP_RIGHT);
					}
				}
			} else {
				if (StringUtil.isChars(allowChars, value)) {
					component.val(this.onEvent.newValue);
				} else {
					component.val("");
					if (this.props.errorMessage) {
						MessageHelper.error(this.props.errorMessage, null, MessageHelper.POSITION_TOP_RIGHT);
					} else {
						MessageHelper.error(r18n.MSG_REGULAR_EXPRESSION_ERROR, null, MessageHelper.POSITION_TOP_RIGHT);
					}
				}
			}
		}
	}

	onPrefixIconClick(event) {
		const { onPrefixIconClick, iconEnabled, enabled } = this.props;
		if (onPrefixIconClick && Util.parseBool(iconEnabled)) {
			onPrefixIconClick(new OnClickEvent(this, event, Param.getParameter(this)));

		} else if (onPrefixIconClick && Util.parseBool(enabled)) {
			onPrefixIconClick(new OnClickEvent(this, event, Param.getParameter(this)));
		}
	}

	onSuffixIconClick(event) {
		const { onSuffixIconClick, iconEnabled, enabled } = this.props;
		if (onSuffixIconClick && Util.parseBool(iconEnabled)) {
			onSuffixIconClick(new OnClickEvent(this, event, Param.getParameter(this)));

		} else if (onSuffixIconClick && Util.parseBool(enabled)) {
			onSuffixIconClick(new OnClickEvent(this, event, Param.getParameter(this)));
		}
	}

	getConvertorId() {
		return ConvertorConstant.TEXT_CONVERTOR;
	}

	componentDidUpdate(nextProps, nextState) {
		super.componentDidUpdate(nextProps, nextState);
		this.clearValidationInfo(nextProps);
	}

	clearValidationInfo(nextProps) {
		const inputObject = $("#" + this.componentId);
		if (Util.parseBool(nextProps.required) && inputObject.val()) {
			inputObject.parent().next().remove();
			const errorInputObject = inputObject.closest(".form-group");
			if (errorInputObject.hasClass("has-error")) {
				inputObject.css("border", "2px solid #E1E8EE");
			};
		}
	}

};


/**@ignore
 * Text component prop types
 */
Text.propTypes = $.extend({}, Input.propTypes, {
	pattern: PropTypes.string,
	clearBlank: PropTypes.oneOf(["left", "right", "both", "all"]),
	allowChars: PropTypes.string,
	toUpperLowerCase: PropTypes.oneOf(["upper", "lower"]),

	prefixIcon: PropTypes.string,
	suffixIcon: PropTypes.string,
	prefixText: PropTypes.string,
	suffixText: PropTypes.string,

	onPrefixIconClick: PropTypes.func,
	onSuffixIconClick: PropTypes.func,
	errorMessage: PropTypes.string,
	componentType:PropTypes.string
});

/**@ignore
 * Get Text component default props
 */
Text.defaultProps = $.extend({}, Input.defaultProps, {
	componentType: "text"
	//clearBlank: "all",
	//allowChars: "/^[A-Z]*$/"
	//toUpperLowerCase: "upper",
	//pattern: "[A-Z]"//"9999-9999",
	//placeHolder: "____-____-____-____"
	//pattern: "9999-9999", placeHolder: "____-_____"
	//"(999) 999-9999" placeholder="(___) ___-____"
});
