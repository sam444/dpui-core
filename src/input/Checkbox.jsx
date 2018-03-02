import KeyValue from "../basic/KeyValue";
import config from "config";
import CodeTable from '../basic/CodeTable';
import { CodeTableService } from "rainbow-foundation-codetable";
import { LocalContext } from "rainbow-foundation-cache";
import { Util } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Checkbox extends KeyValue {

    constructor() {
        super();
        this.optionJson = null;
    }

    componentDidUpdate() {
        super.componentDidMount();
        if (!_.isEmpty(this.props.style)) {
            const radioObject = $("#" + this.componentId);
            const style = radioObject.find('input:first').attr("style");
            radioObject.find("label").attr("style", style);
        }
    }

    componentDidMount() {
        super.componentDidMount();

        let { codeTableId, conditionMap, codeTableName } = this.props;
        let _self = this;
        if (codeTableId || codeTableName) {
            let getCode = codeTableId ? { "CodeTableId": codeTableId, "ConditionMap": conditionMap } : null;
            getCode = getCode ? getCode : codeTableName ? { "CodeTableName": codeTableName, "ConditionMap": conditionMap } : {};
            if (!config.isNotShowCodetableIdWarning && codeTableId) {
                toastr["warning"](this.countdown());
            }
            if (codeTableId || Util.parseBool(this.props.immediately)) {
                CodeTableService.getCodeTable(getCode).then(function (data) {
                    _self.handlerCheckBoxAndRadio4In(data);
                });
            } else {
                _self.saveCodetableNames(codeTableName, conditionMap);
            }
        }

    }



    renderComponent() {
        if (Util.parseBool(this.props.single) && this.props.singleLabel != undefined) {
            if (this.props.layout == "vertical") {
                return this.renderVerticalLayout();
            }
            else if (this.props.layout == "horizontal") {
                return this.renderHorizontalLayout();
            }
        } else {
            return super.renderComponent();
        }
    }

    renderVerticalLayout() {
        if (this.props.label != undefined) {
            return super.renderVerticalLayout();
        } else {
            return (
                <div className="form-group">
                    {this.renderInputComponent()}
                </div>
            );
        }
    }

    renderHorizontalLayout() {
        if (this.props.label != undefined) {
            return super.renderHorizontalLayout();
        } else {
            let styleClass = "col-sm-12 col-md-12 col-lg-12";
            let styleClassWidth = this.getStyleClassWidth();
            let labelWidth = null, inputWidth = null;
            if (styleClassWidth.length != 0) {
                labelWidth = styleClassWidth[0];
                inputWidth = styleClassWidth[1];
            }
            return (
                <div className="form-group line-horizontal">
                    <div className={styleClass} style={{ width: inputWidth }}>{this.renderInputComponent()}</div>
                </div>
            );
        }
    }

    renderInput() {
        if (Util.parseBool(this.props.single) || this.props.hiddenValue) {
            return this.renderSingleInput();
        } else {
            return this.renderMultipleInput();
        }
    }

    renderSingleInput() {
        if (!this.props.label && Util.parseBool(this.props.required)) {
            return this.renderSingleWithRequired();
        } else if (!this.props.label && Util.parseBool(this.props.helpText)) {
            return this.renderSingleWithHelpText();
        } else {
            return this.renderSingleWithoutRequired();
        }

    }
    renderSingleWithHelpText() {
        return (
            <div className="checkbox">
                <label className="demo--label">
                    <input type="checkbox" className="checkbox-inout demo--radio" id={this.componentId} name={this.getName()} title={this.getI18n(this.props.title)}
                        disabled={this.getDisabled()} data-auto-test={this.getNameForTest()} />
                    <label className="demo--checkbox demo--radioInput" for={this.componentId}></label>
                    {this.props.singleLabel ? this.getI18n(this.props.singleLabel) : ""}
                </label>
                {this.renderHelpText()}
            </div>
            
        );
    }
    renderSingleWithoutRequired() {
        return (
            <div className="checkbox">
                <label className="demo--label">
                    <input type="checkbox" className="checkbox-inout demo--radio" id={this.componentId} name={this.getName()} title={this.getI18n(this.props.title)}
                        disabled={this.getDisabled()} data-auto-test={this.getNameForTest()} />
                    <label className="demo--checkbox demo--radioInput" for={this.componentId}></label>
                    {this.props.singleLabel ? this.getI18n(this.props.singleLabel) : ""}
                </label>
            </div>
        );
    }

    renderSingleWithRequired() {
        return (
            <div className="checkbox">
                <label className="demo--label">
                    <input type="checkbox" className="checkbox-inout demo--radio" id={this.componentId} name={this.getName()} title={this.getI18n(this.props.title)}
                        disabled={this.getDisabled()} data-auto-test={this.getNameForTest()} />
                    <label className="demo--checkbox demo--radioInput" for={this.componentId}>{this.props.singleLabel ? this.getI18n(this.props.singleLabel) : ""}</label>
                </label>
                <span id={this.componentId + "_single_required"} className="fa fa-asterisk"
                    data-toggle="tooltip" data-placement="top" title={this.props.singleLabel + " is required."}
                    style={{ paddingLeft: "-5px", color: "#ff5555" }}>
                </span>
            </div>
        );
    }

    renderMultipleInput() {
        return (<div className="checkbox" id={this.componentId}>{this.getDomArray()}</div>);
    }

    getDomArray() {
        let _self = this;
        let { codeTableId } = this.props;

        let optionJson = this.optionJson == null ? this.getOptionJson() : this.optionJson;
        let checkboxArray = [];

        if (optionJson || !codeTableId) {

            $.each(optionJson, function (index, element) {
                let key = element[config.DEFAULT_CODETABLE_KEYVALUE.KEY];
                let value = element[config.DEFAULT_CODETABLE_KEYVALUE.VALUE];

                let checkboxItem = (
                    <label style={{ width: _self.props.itemWidth }} className="demo--label" >
                        <input id={_self.componentId + "-" + index} type="checkbox" className="checkbox-inout demo--radio" name={_self.getName()} title={_self.getI18n(_self.props.title)} value={key} disabled={_self.getDisabled()} style={_self.props.style} />
                        <label class="demo--checkbox demo--radioInput" for={_self.componentId + "-" + index}></label>{value}
                    </label>
                );

                if (_self.props.displayStyle == "horizontal") {
                    checkboxArray.push(<div className="checkbox">{checkboxItem}</div>);

                    if (_self.props.itemSpacing != null && _self.props.itemSpacing != undefined) {
                        checkboxArray.push(<div style={{ paddingTop: _self.props.itemSpacing }} />);
                    }
                } else {
                    checkboxArray.push(checkboxItem);

                    if (_self.props.itemPerLine != undefined && (index + 1) % parseInt(_self.props.itemPerLine) == 0) {
                        checkboxArray.push(<br />);
                    }

                    if (_self.props.itemSpacing != null && _self.props.itemSpacing != undefined) {
                        checkboxArray.push(<span style={{ paddingLeft: _self.props.itemSpacing }} />);
                    }
                }
            });
        }

        return checkboxArray;
    }

    getOutputValue() {
        if (Util.parseBool(this.props.single)) {
            return ($.inArray(Checkbox.CHECKED_VALUE, this.getComponentValue()) != -1) ? Checkbox.CHECKED_VALUE : Checkbox.UNCHECKED_VALUE;
        } else {
            return super.getOutputValue();
        }
    }

    initValue() {
        let _self = this, value = this.getComponentValue();

        if (Util.parseBool(this.props.single)) {
            if (_self.isKeyValueElement(Checkbox.CHECKED_VALUE, value)) {
                $("#" + this.componentId).prop("checked", true);
            } else {
                $("#" + this.componentId).prop("checked", false);
            }
        }

        else if (this.props.hiddenValue != undefined) {
            if (_self.isKeyValueElement(value, this.props.hiddenValue)) {
                $("#" + this.componentId).prop("checked", true);
            } else {
                $("#" + this.componentId).prop("checked", false);
            }
        }

        else {
            $("input:checkbox[name=" + this.componentId + "]").each((index, element) => {
                if (_self.isKeyValueElement(value, element.value)) {
                    //$(element).attr("checked", "checked");
                    element.checked = true;
                } else {
                    //$(element).attr("checked", null);
                    element.checked = false;
                }
            });
        }
    }

    getInputValue(event) {
        if (Util.parseBool(this.props.single)) {
            return $("#" + this.componentId).is(":checked") ? Checkbox.CHECKED_VALUE : Checkbox.UNCHECKED_VALUE;
        }

        else if (this.props.hiddenValue != undefined) {
            let inputValue = this.getComponentValue();
            inputValue = (inputValue != null && inputValue != undefined && inputValue != "") ? inputValue : [];

            let _self = this;
            if ($("#" + this.componentId).is(":checked")) {
                inputValue.push(this.props.hiddenValue);
            } else {
                let index = inputValue.indexOf(this.props.hiddenValue);
                if (index > -1) {
                    inputValue.splice(index, 1);
                }
            }
            return inputValue;
        }

        else {
            var valueArray = [];
            $("input:checkbox[name=" + this.componentId + "]:checked").each(function (index, element) {
                valueArray.push(element.value);
            });
            return valueArray;
        }
    }

    renderHelpText() {
        let doesUseHelpMessage = LocalContext.get('DOSE_USE_HELP_MESSAGE');
        if (doesUseHelpMessage == null || doesUseHelpMessage == undefined || Util.parseBool(doesUseHelpMessage)) {
            if (this.props.helpText || this.props.helpImage || this.props.helpHtml) {
                let helpMessage = '';
                if (this.props.helpText) {
                    helpMessage = this.getI18n(this.props.helpText);
                } else if (this.props.helpImage) {
                    let imageUrl = UrlUtil.getConfigUrl("STATIC_RESOURCE") + this.props.helpImage;
                    helpMessage = imageUrl ? '<img src=' + imageUrl + ' width=100%/>' : '';
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
};


// hanlder checkbox checked value & unchecked value
Checkbox.CHECKED_VALUE = config.DEFAULT_BOOLEAN_VALUE.TRUE;
Checkbox.UNCHECKED_VALUE = config.DEFAULT_BOOLEAN_VALUE.FALSE;


/**@ignore
* Checkbox component prop types
*/
Checkbox.propTypes = $.extend({}, KeyValue.propTypes, {
    single: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    singleLabel: PropTypes.string,
    displayStyle: PropTypes.oneOf(["horizontal", "vertical"]),
    itemSpacing: PropTypes.string,
    itemWidth: PropTypes.string,
    itemPerLine: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    hiddenValue: PropTypes.string
});

/**@ignore
* Get Checkbox component default props
*/
Checkbox.defaultProps = $.extend({}, KeyValue.defaultProps, {
    componentType: "CHECKBOX",
    single: false,
    displayStyle: "vertical",
    itemWidth: null,
    itemPerLine: null
});