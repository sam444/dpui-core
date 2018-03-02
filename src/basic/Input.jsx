import config from "config";
import Component from "./Component";
import Param from "./Param";
import Event from "./Event";
import OnChangeEvent from '../event/OnChangeEvent';
import OnBlurEvent from '../event/OnBlurEvent';
import OnFocusEvent from '../event/OnFocusEvent';
import { ComponentContext, ValidatorContext, PageContext, LocalContext } from "rainbow-foundation-cache";
import { Util, StringUtil, ELUtil, UrlUtil } from 'rainbow-foundation-tools';
import Convertor from '../convertor/Convertor';
import Validator from '../validator/Validator';
import r18n from "../i18n/reactjs-tag.i18n";
import PropTypes from 'prop-types';

export default class Input extends Component {

    constructor(props) {
        super(props)
        this.temp = "",
            this.tempClass = "inputClass";
    }
    renderComponent() {

        this.tempClass = this.props.io == 'in' ? "inputClass" : "outputClass";

        if (this.props.layout == "vertical") {
            return this.renderVerticalLayout();
        }

        else if (this.props.layout == "horizontal") {
            return this.renderHorizontalLayout();
        }
    }

    renderVerticalLayout() {
        if (this.props.label) {
            return (
                <div className={"form-group " + this.tempClass + " " + this.props.inputClass}>
                    <label htmlFor={this.componentId}>
                        {this.renderLabel()}
                        {this.renderHelpText()}
                        {this.renderRequired()}
                    </label>
                    <div className={(Util.parseBool(this._required) && this.props.io != "out") ? 'input-required' : null} id={"for-input-"+this.componentId} data-toggle="tooltip" data-placement="bottom" data-trigger="hover" data-original-title={this.getI18n(this.props.title)}>
                        {this.renderInputComponent()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"form-group " + this.tempClass}>
                    <label htmlFor={this.componentId} />
                    <div id={"for-input-"+this.componentId} data-toggle="tooltip" data-placement="bottom" data-trigger="hover" data-original-title={this.getI18n(this.props.title)}>
                        {this.renderInputComponent()}
                    </div>
                </div>
            );
        }
    }





    /*** Render horizontal layout */
    renderHorizontalLayout() {
        let styleClassArray = this.getStyleClassArray();
        let styleClassWidth = this.getStyleClassWidth();
        let labelWidth = null, inputWidth = null;
        let inputStyleClass = styleClassArray[1];
        if (Util.parseBool(this._required) && this.props.io != "out") {
            inputStyleClass += " input-required"
        }
        if (styleClassWidth.length != 0) {
            labelWidth = styleClassWidth[0];
            inputWidth = styleClassWidth[1];
        }

        if (this.props.label) {
            return (
                <div className={"form-group row line-horizontal " + this.tempClass}>
                    <label htmlFor={this.componentId} className={styleClassArray[0] + " col-form-label"}
                        style={{ width: labelWidth }}>
                        {this.renderLabel()}
                        {this.renderHelpText()}
                        {this.renderRequired()}
                    </label>
                    <div className={inputStyleClass} style={{ width: inputWidth }} id={"for-input-"+this.componentId} data-toggle="tooltip" data-placement="bottom" data-trigger="hover" data-original-title={this.getI18n(this.props.title)}>
                        {this.renderInputComponent()}
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"form-group row line-horizontal " + this.tempClass}>
                    <label htmlFor={this.componentId} className={styleClassArray[0] + " col-form-label"}
                        style={{ width: labelWidth }} />
                    <div className={inputStyleClass} style={{ width: inputWidth }} id={"for-input-"+this.componentId} data-toggle="tooltip" data-placement="bottom" data-trigger="hover" data-original-title={this.getI18n(this.props.title)}>
                        {this.renderInputComponent()}
                    </div>
                </div>
            );
        }
    }

    renderLabel() {
        if (Util.isObject(this.props.label)) {
            return (
                <span>
                    {this.props.label}
                </span>
            );
        } else {
            return (
                <span>
                    {super.getI18n(this.props.label)}
                </span>
            );
        }
    }

    /*** Render input component */
    renderInputComponent() {
        if (this.props.io == "in" || this.props.io == null) {
            return this.renderInput();
        } else if (this.props.io == "out") {
            return this.renderOutput();
        }

        return <noscript />;
    }

    /*** Render input */
    renderInput() {
        return <noscript />;
    }

    /*** Render output */
    renderOutput() {
        const output = this.getOutputValue();
        if (output && output instanceof Array) {
            return (
                <span id={this.componentId} className="outPutText" style={this.props.style}>
                    {
                        output.map(item => {
                            return <span className='outPutTextItem'>{item}</span>;
                        })
                    }
                </span>
            );
        } else {
            return (
                <span id={this.componentId} className="outPutText" style={this.props.style}>
                    {output}
                </span>
            );
        }
    }


    /*** Get output value */
    getOutputValue() {
        let value = this.getComponentValue();

        if (this.props.mask != null && this.props.mask != undefined) {
            value = StringUtil.mask(value, this.props.mask);
        }

        return value;
    }

    /*
    *init MaxLength
    */
    initMaxLength(val) {
        if (this.props.maxLength) {
            let maxLength = parseInt(this.props.maxLength) < 0 ? 0 : parseInt(this.props.maxLength);
            maxLength = maxLength < 0 ? 0 : maxLength;
            if (val && val.toString().indexOf("-") == 0) {
                maxLength += 1;
            }
            if (maxLength >= 0) {
                if (this.props.subType == "UINumber" || this.props.subType == "UICurrency") {
                    if (this.props.model && this.props.property) {
                        var propsVal = this.props.model[this.props.property];
                        if (propsVal != null && propsVal != undefined && parseInt(propsVal).toString().length > (maxLength - (parseInt(this.props.decimalPrecision) + 1))) {
                            this.temp = propsVal.toString().substr(0, (maxLength - (parseInt(this.props.decimalPrecision) + 1)));
                        } else {
                            this.temp = this.props.model[this.props.property];
                        }
                    }
                    if (val != null && val != undefined && parseInt(val).toString().length <= (maxLength - (parseInt(this.props.decimalPrecision) + 1))) {
                        this.temp = val;
                        return val;
                    }
                    else {
                        if (!val) {
                            this.temp = null;
                        }
                        $('#' + this.componentId).val(this.temp);
                        return $('#' + this.componentId).val();
                    }

                } else {
                    if (this.props.componentType == "textarea") {
                        if(val != null && val != undefined){
                            val =  val.replace(new RegExp("<br/>", "gm"), "\n"); 
                        }                           
                    }
                    if (val != null && val != undefined && val.toString().length <= maxLength) {
                        this.temp = val;
                        return val;
                    } else {
                        if (!val) {
                            this.temp = null;
                        }
                        $('#' + this.componentId).val(this.temp);
                        return $('#' + this.componentId).val();
                    }
                }
            }
            return val;
        }
        return val;
    }

    /*** Set component value */
    setComponentValue(event) {
        var inputValue = Convertor.getAsObject(this.getConvertorId(), this, this.getInputValue(event));
        if (Util.parseBool(this.props.maxLength)) {
            inputValue = this.initMaxLength(inputValue);
        }
        /* 
        * UIPercent componet limit error handler
        */
        if (this.props.limit) {
            if (inputValue >= parseFloat(this.props.limit) / 100) {
                inputValue = parseFloat(this.props.limit) / 100;
            }
        }

        this.setValue(this.props.value, inputValue);

    }

    getEventNewValue(event) {
        let inputValue = Convertor.getAsObject(this.getConvertorId(), this, this.getInputValue(event));

        /*
         * UIPercent componet limit error handler
         */
        if (this.props.limit) {
            if (inputValue >= parseFloat(this.props.limit) / 100) {
                inputValue = parseFloat(this.props.limit) / 100;
            }
        }

        return inputValue;
    }

    /**@ignore
     * Get component value
     * If value is not null, it get value. else it get default value.
     */
    getComponentValue() {
        let value = null, { defaultValue } = this.props;
        value = this.getValue(this.props.value);
        // if value is null or undefined, and default value is not null or not defined, set default value to component value
        if ((value == null || value == undefined) && (defaultValue != null && defaultValue != undefined)) {
            value = defaultValue;
            this.setValue(this.props.value, Convertor.getAsObject(this.getConvertorId(), this, value));
        }
        if (Util.parseBool(this.props.valueTostring) && !_.isEmpty(value)) {
            value = JSON.parse(value);
        }
        return Convertor.getAsString(this.getConvertorId(), this, value);
    }

    /**@ignore
     * Set value
     */


    setValue(value, inputValue) {
        const model = this.props.model;
        const property = this.props.property;
        if (model != null && property != null) {
            model[property] = Util.parseBool(this.props.valueTostring) ? JSON.stringify(inputValue) : inputValue;
        } else if (value != null) {
            value = inputValue;
        }
    }


    /**@ignore
     * Get value
     */

    getValue(value) {
        let inputValue = null;
        const model = this.props.model;
        const property = this.props.property;
        if (Util.isFunction(value)) {
            inputValue = value();
        } else if (value != null) {
            inputValue = value;
        } else if (model != null && property != null) {
            inputValue = model[property];
        }

        return inputValue;

    }

    /**@ignore
     * Get prefix and suffix json from value
     */
    getPrefixSuffixJson(value) {
        let psJson = {};
        let index = value.indexOf('.');
        psJson.prefix = value.substr(0, index);

        //model[0].a.b || model.a.b
        if (psJson.prefix.indexOf("[") != -1) {
            let leftIndex = psJson.prefix.indexOf("[");
            let rightIndex = psJson.prefix.indexOf("]");
            psJson.count = psJson.prefix.substr(leftIndex + 1, rightIndex - leftIndex - 1); // 0

            psJson.prefix = value.substr(0, leftIndex);//model
        }
        psJson.suffix = value.substr(index + 1, value.length);//a.b

        return psJson;
    }

    getValidatorId() {
        return null;
    }

    getConvertorId() {
        return null;
    }

    getComponent() {
        return $("#" + this.componentId);
    }

    getInputValue(event) {
        // let inputRef = this.getInputRefProperty();
        // if (React.findDOMNode(this.refs[inputRef])) {
        //     return React.findDOMNode(this.refs[inputRef]).value;
        // } else {
        //     return "";
        // }
        return $('#' + this.componentId).val();
    }

    initEvent() {
        let _self = this;
        let me = $("#" + this.componentId);
        // handler input propertychange
        me.bind("input propertychange", (event) => {
            //排除DateTimePicker在手动输入时超限的问题
            if (!(_self.props.manualInput && Util.parseBool(_self.props.manualInput))) {
                _self.setComponentValue(event);
            }
            if (_self.props.componentType == "datetimepicker" && Util.parseBool(_self.props.manualInput)) {
                _self.formatDateofManualInput(event);
            }
            if (Util.parseBool(_self.props.required)) {
                const value = me.val();
                if (value) {
                    me.closest(".input-required").removeClass("input-required");
                } else {
                    me.parent().addClass("input-required");
                }
            }
        });

        // handle onchange event
        me.bind("change", (event) => {
            _self.onChangeCallback(_self);
        });

        // handle onblur event
        me.bind("blur", (event) => {
            _self.showValueTooltip();
            if (_self.props.onBlur) {
                _self.props.onBlur(new OnBlurEvent(_self, event, Param.getParameter(_self), null, null));
            }
        });

        // handle onfocus event
        me.bind("focus", (event) => {
            $('#'+_self.componentId).tooltip('hide');
            if (_self.props.onFocus) {
                _self.props.onFocus(new OnFocusEvent(_self, event, Param.getParameter(_self), null, null));
            }
        });

        me.bind("keydown", (event) => {
            if (_self.props.onKeyDown) {
                _self.props.onKeyDown(new OnFocusEvent(_self, event, Param.getParameter(_self), null, null));
            }
        });

        me.bind("keyup", (event) => {
            if (this.props.componentType == "textarea") {
                this.checkMaxInput();
            }
            if (_self.props.onKeyUp) {
                _self.props.onKeyUp(new OnFocusEvent(_self, event, Param.getParameter(_self), null, null));
            }
        });

        me.bind("contextmenu", (event) => {
            if (Util.parseBool(this.props.unableContext)) {
                return false;
            }
        });

        me.bind("paste", (event) => {
            if (Util.parseBool(this.props.unablePaste)) {
                return false;
            }
        });
    }

    /*** Get input ref property  */
    getInputRefProperty() {
        let refProperty = this.getRefProperty();
        return refProperty + "_ref";
    }


    onChangeCallback(_self) {
        let value = _self.getInputValue(event);
        if (_self.getDigitValue) {
            value = _self.getDigitValue(value);
        }
        let valueChangeEvent = new OnChangeEvent(_self, event, Param.getParameter(_self), value, _self.onEvent.newValue);
        if (_self.props.onChange) {
            _self.props.onChange(valueChangeEvent);
        }

        _self.onEvent = { newValue: value, oldValue: _self.onEvent.newValue };
    }

    /*** Init value */
    initValue() {
        $("#" + this.componentId).val(this.getComponentValue());
    }

    /*** Init disabled */
    initDisabled() {
        $("#" + this.componentId).attr("disabled", this.getDisabled());
    }

    initReadOnly() {

    }

    /*** Init property */
    initProperty() {
        this.initValue();

        this.initDisabled();

        this.initReadOnly();
    }

    /*** Init component */
    initComponent() {
    }

    /*** Init validator */
    initValidator() {
        ValidatorContext.removeValidator(this.getValidationGroup(), this.componentId);
        if (this.props.validator) {
            this.props.validator.validate(this);
        } else if (this.props.io == "in" || this.props.io == null) {
            Validator.validate("InputValidator", this);

            // call component validator
            Validator.validate(this.getValidatorId(), this);
        }
    }

    getValidationGroup() {
        if (this.props.validationGroup == null || this.props.validationGroup == undefined) {
            return "commonValidation";
        } else {
            return this.props.validationGroup;
        }
    }

    /**@ignore
     * render children comonent required
     */
    renderRequired() {
        if (Util.isObject(this._required)) {
            return (
                <span>
                    {this._required}
                </span>
            )
        } else {
            if (Util.parseBool(this._required) && this.props.io != "out") {
                return (
                    <span id={this.componentId + "_required"} className={this.props.requiredText == null ?
                        "glyphicon glyphicon-asterisk" : "requiredTextClass"}
                        data-toggle="tooltip" data-placement="top" title={r18n.Required}
                        style={{ paddingLeft: "5px", color: "#ff5555", transform: "scale(0.7)" }}>
                        {this.props.requiredText != null ? this.props.requiredText : ""}
                    </span>
                );
            }
        }
    }

    /**@ignore
     * render children comonent helpText
     */
    renderHelpText() {
        let doesUseHelpMessage = LocalContext.get('DOSE_USE_HELP_MESSAGE');
        if (doesUseHelpMessage == null || doesUseHelpMessage == undefined || Util.parseBool(doesUseHelpMessage)) {
            if (this.props.helpText || this.props.helpImage || this.props.helpHtml) {
                let helpMessage = '';
                if (this.props.helpText) {
                    helpMessage = this.getI18n(this.props.helpText);
                } else if (this.props.helpImage) {
                    let imageUrl = UrlUtil.getConfigUrl("STATIC_RESOURCE") + this.props.helpImage;
                    helpMessage = imageUrl ? '<img src='+imageUrl+' width=100%/>' : '';
                } else {
                    helpMessage = this.props.helpHtml;
                }
                return (<span id={this.componentId + "_helpText"} className="glyphicon glyphicon-question-sign"
                    data-html={true} data-toggle="tooltip" data-placement="top"
                    title={helpMessage} style={{ paddingLeft: "5px", color: "#ed9c28" }}>
                </span>);
            }
        }

    }

    getWidthAllocation() {
        let allocation = this.props.widthAllocation.split(",");
        let widthAllocation = [];
        widthAllocation[0] = StringUtil.trim(allocation[0]);
        widthAllocation[1] = StringUtil.trim(allocation[1]);

        return widthAllocation;
    }

    getStyleClassArray() {
        let allocation = this.getWidthAllocation();
        let styleClass = [];
        styleClass[0] = "col-sm-" + allocation[0] + " col-md-" + allocation[0] + " col-lg-" + allocation[0];
        styleClass[1] = "col-sm-" + allocation[1] + " col-md-" + allocation[1] + " col-lg-" + allocation[1];

        return styleClass;
    }

    getStyleClassWidth() {
        let styleClassWidth = [];
        let colspan = this.props.colspan;

        if (colspan != null && colspan != undefined) {
            let allocation = this.getWidthAllocation();
            styleClassWidth[0] = ((100 * allocation[0]) / (12 * colspan)).toFixed(8) + "%";
            styleClassWidth[1] = 100 - ((100 * allocation[0]) / (12 * colspan)).toFixed(8) + "%";
        }

        return styleClassWidth;
    }

    setProperty() {
        super.setProperty();

        this._label = this.getProperty("label");
        this._required = this.getProperty("required");
    }

    componentWillMount() {
        super._componentWillMount();

        this.onEvent = { newValue: this.getComponentValue(), oldValue: null };
    }

    componentDidMount() {
        super._componentDidMount();
        $("[data-toggle='tooltip']").tooltip();
        if (this.props.io != "out") {
            this.initEvent();
            this.initProperty();
            this.initValidator();
            this.initComponent();

            Event.initEventListener(this);

            ComponentContext.put(this.componentId, this);
        }
        this.showValueTooltip();
    }

    componentWillUpdate(nextProps, nextState) {
        super._componentWillUpdate();
    }

    componentDidUpdate(prevProps, prevState) {
        $("[data-toggle='tooltip']").tooltip();
        if (this.props.io != "out") {
            let object = $("#" + this.componentId);
            if (object.length != 0) {
                if (object.length > 0 && $._data(object[0], "events") == undefined) {
                    this.initEvent();
                }
            } else {
                object = $("input[name=" + this.componentId + "]");
                if (object.length > 0 && $._data(object[0], "events") == undefined) {
                    this.initCodeTableEvent();
                }
            }

            //if($("#" + this.componentId).length > 0 && $._data($("#" + this.componentId)[0], "events") == undefined){
            //  this.initEvent();
            //}

            if (document.activeElement != null && document.activeElement.id != this.componentId) {
                this.initProperty();
            }

            this.initValidator();
            if (prevProps.io == "out" || !Util.parseBool(prevProps.visibled)) {
                this.initComponent();
            }
            this.showValueTooltip();
        }
    }

    initCodeTableEvent() {

    }

    showValueTooltip() {
        let inputObj = $("#" + this.componentId);
        let inputDiv = $("#for-input-"+this.componentId);
        if (this.props.componentType == "text"
            || this.props.componentType == "number"
            || this.props.componentType == "textarea") {
            if (inputObj.val() && Util.parseBool(this.props.showValueTooltip)) {
                inputDiv.attr("data-original-title", inputObj.val());
            } else {
                if (this.props.title) {
                    inputDiv.attr("data-original-title", this.getI18n(this.props.title));
                } else {
                    inputDiv.attr("data-original-title", "");
                }
            }
        }
    }

};

// Minxin
//reactMixin.onClass(Input, BindToMixin);

/**@ignore
 * Input component prop types
 */
Input.propTypes = $.extend({}, Component.propTypes, {
    label: PropTypes.string,
    hasLabel: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    validationLabel: PropTypes.string,
    defaultValue: PropTypes.string,
    io: PropTypes.oneOf(["in", "out"]),
    placeHolder: PropTypes.string,
    //pattern: PropTypes.string,
    format: PropTypes.string,
    mask: PropTypes.string,
    helpText: PropTypes.string,
    helpImage: PropTypes.string,
    helpHtml: PropTypes.string,
    layout: PropTypes.oneOf(["horizontal", "vertical"]),
    widthAllocation: PropTypes.string,
    styleClassAllocation: PropTypes.string,
    validationGroup: PropTypes.string,
    title: PropTypes.string,
    iconEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    unableContext: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    unablePaste: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

    minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minLengthMessage: PropTypes.string,
    maxLengthMessage: PropTypes.string,
    requiredMessage: PropTypes.string,
    //componentType: PropTypes.string,
    inputClass: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    isValidation: PropTypes.string,
    validator: PropTypes.object,
    showValueTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
});

/**@ignore
 * Get Input component default props
 */
Input.defaultProps = $.extend({}, Component.defaultProps, {
    io: "in",
    //causeValidation: true,
    defaultValue: null,
    required: false,
    layout: config.DEFAULT_INPUT_LAYOUT,
    widthAllocation: "4,8",
    componentType: "INPUT",
    unableContext: "false",
    unablePaste: "false",
    inputClass: "inputClass",
    onChange: () => {
    },
    onBlur: () => {
    },
    onFocus: () => {
    },
    isValidation: "true",
    iconEnabled: "false",
    requiredText: null,
    showValueTooltip: false
});