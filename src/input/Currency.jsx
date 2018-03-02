import Digit from "../basic/Digit";
import config from "config";
import { Util } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Currency extends Digit {

    renderInput() {
        if (this.props.unitPosition == "right") {
            return (
                <div className="input-group">
                    <input id={this.componentId} name={this.getName()} type="text" className="form-control textRight" style={this.props.style} title={this.getI18n(this.props.title)}
                           placeholder={this.props.placeHolder} data-auto-test={this.getNameForTest()} maxLength={this.props.maxLength}/>
                    <span className="input-group-addon currencyoverflow">{this.props.unit}</span>
                </div>
            );
        } else if (this.props.unitPosition == "none") {
            return (
                <div className="input-group">
                    <input id={this.componentId} name={this.getName()} type="text" className="form-control textRight" style={this.props.style} title={this.getI18n(this.props.title)}
                           placeholder={this.props.placeHolder} data-auto-test={this.getNameForTest()} maxLength={this.props.maxLength}/>
                </div>
            )
        } else {
            return (
                <div className="input-group">
                    <span className="input-group-addon currencyoverflow">{this.props.unit}</span>
                    <input id={this.componentId} name={this.getName()} type="text" className="form-control textRight" style={this.props.style} title={this.getI18n(this.props.title)}
                           placeholder={this.props.placeHolder} data-auto-test={this.getNameForTest()} maxLength={this.props.maxLength}/>
                </div>
            );
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

        return <noscript/>;
    }

    /*** Render output */
    renderOutput() {
          if(this.props.layout=="horizontal"){
            return (
                <span id={this.componentId} className="outPutText">
                    {this.props.unit}{" "}{this.getOutputValue()}
                </span>
            );
          }else{
              return (
                  <span id={this.componentId} className="outPutText">
                      {this.props.unit}{" "}{this.getOutputValue()}
                  </span>
              );
          }

    }

    /**@ignore
     * Get output value
     */
    getOutputValue() {
        return this.getComponentValue() || '';
    }

    componentDidUpdate(nextProps, nextState) {
        super.componentDidUpdate(nextProps, nextState);
        this.clearValidationInfo(nextProps);
    }

    clearValidationInfo(nextProps){
        const inputObject =  $("#" + this.componentId);
        if(Util.parseBool(nextProps.required)&&inputObject.val()){
            inputObject.parent().parent().next().remove();
            const errorInputObject = inputObject.closest(".form-group");
            if(errorInputObject.hasClass("has-error")){
                inputObject.closest(".input-group").css("border", "2px solid #E1E8EE");
            };
        }
    }

};

/**@ignore
 * Currency component prop types
 */
Currency.PropTypes = $.extend({}, Digit.propTypes, {
    unit: PropTypes.string,
    unitPosition: PropTypes.oneOf(["left", "right", "none"]),
});

/**@ignore
 * Get Currency component default props
 */
Currency.defaultProps = $.extend({}, Digit.defaultProps, {
    format: config.DEFAULT_CURRENCY_FORMAT,
    unit: config.DEFAULT_CURRENCY_UNIT,
    unitPosition: "left",
    subType:"UICurrency"
});
