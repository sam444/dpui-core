import Digit from "../basic/Digit";
import config from "config";
import ConvertorConstant from '../convertor/ConvertorConstant';
import { Util } from "rainbow-foundation-tools";
import PropTypes from 'prop-types';

export default class Percent extends Digit {

    renderInput() {
        if (this.props.symbolPosition == "none") {
            return (<div className="input-group">{this.renderInputElement()}</div>);
        } else {
            return (<div className="input-group">{this.renderInputElement()}{this.renderSymbol()}</div>);
        }
    }

    /*** Render input component */
    renderInputComponent() {
        if (this.props.io == "in" || this.props.io == null) {
            return this.renderInput();
        }

        else if (this.props.io == "out") {
            return this.renderOutput();
        }

        return <noscript />;
    }

    /*** Render output */
    renderOutput() {
        if (this.props.symbolPosition == "none") {
            return (
                <span>
                    <span className="outPutText textRight disBlock">
                        {this.getOutputValue()}
                    </span>
                </span>
            );
        } else {
            return (
                <span>
                    <span className="outPutText textRight disBlock">
                        {this.getOutputValue()}
                    </span>
                    {this.renderOutPutSymbol()}
                </span>
            );
        }
    }

    /**@ignore
     * Render input element
     */
    renderInputElement() {
        return (
            <input id={this.componentId} name={this.getName()} type="text" className="form-control textRight paddingRight0" style={this.props.style}
                placeholder={this.props.placeHolder} title={this.getI18n(this.props.title)} data-auto-test={this.getNameForTest()} maxLength={this.props.maxLength} />
        );
    }

    /**@ignore
     * Render symbol
     */
    renderSymbol() {
        if (Util.parseBool(this.props.isPermillage)) {
            return (
                <span className="input-group-addon percentcover">
                    <span className="glyphicon2 glyphicon-envelope2">{Percent.PermillageSymbol}</span>
                </span>
            );
        } else {
            return (
                <span className="input-group-addon percentcover">
                    <span className="glyphicon2 glyphicon-envelope2">{Percent.SYMBOL}</span>
                </span>
            );
        }
    }

    /**@ignore
     * Render output symbol
     */
    renderOutPutSymbol() {
        if (Util.parseBool(this.props.isPermillage)) {
            return (
            <span className="input-group-addon percentcover" style={{ marginRight: "15px" }}>
                {Percent.PermillageSymbol}
            </span>
        );
        }else{
            return (
            <span className="input-group-addon percentcover" style={{ marginRight: "15px" }}>
                {Percent.SYMBOL}
            </span>
        );
        }
        
    }

    getOutputValue() {
        return this.getComponentValue();
        // render percent component by symbol position
        // if(this.props.symbolPosition == "left"){
        // 	return Percent.SYMBOL + " " + value;
        // } else if(this.props.symbolPosition == "none"){
        // 	return value;
        // } else {
        // 	return value + " " + Percent.SYMBOL;
        // }
    }

    initEvent() {
        super.initEvent();

        let _self = this;
        $("#" + this.componentId).change((event) => {
            let value = event.target.value;
            value = value.replace(/[^0-9\.]/g, "");
            if (parseFloat(value) > parseInt(_self.props.limit)) {
                _self.setComponentValue(event);
                $("#" + _self.componentId).val(_self.formatDigit(_self.canonicalDigit(parseInt(_self.props.limit))));
                _self.onChangeCallback(_self);
            }
        });
    }

    getConvertorId() {
        if (Util.parseBool(this.props.isPermillage)) {
            return ConvertorConstant.PERMILLAGE_CONVERTOR;
        } else {
            return ConvertorConstant.PERCENT_CONVERTOR;
        }
    }

    componentDidUpdate(nextProps, nextState) {
        super.componentDidUpdate(nextProps, nextState);
        this.clearValidationInfo(nextProps);
    }

    clearValidationInfo(nextProps) {
        const inputObject = $("#" + this.componentId);
        if (Util.parseBool(nextProps.required) && inputObject.val()) {
            inputObject.parent().parent().next().remove();
            const errorInputObject = inputObject.closest(".form-group");
            if (errorInputObject.hasClass("has-error")) {
                inputObject.closest(".input-group").css("border", "2px solid #E1E8EE");
            };
        }
    }

};

/**@ignore
 * Percent symbol
 */
Percent.SYMBOL = "%";
Percent.PermillageSymbol = "‰";

/**@ignore
 * Percent component prop types
 */
Percent.PropTypes = $.extend({}, Digit.propTypes, {
    limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    symbolPosition: PropTypes.oneOf(["right", "none"]),
    isPermillage: "PropTypes.bool, Define whether this element is supported permillage, default is false."
});

/**@ignore
 * Get Percent component default props
 */
Percent.defaultProps = $.extend({}, Digit.defaultProps, {
    format: config.DEFAULT_NUMBER_FORMAT,
    limit: 100,
    symbolPosition: "right",
    isPermillage: false
});
