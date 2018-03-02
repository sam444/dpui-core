import KeyValue from "../basic/KeyValue";
import config from "config";
import CodeTable from '../basic/CodeTable';
import { CodeTableService } from "rainbow-foundation-codetable";
import PropTypes from 'prop-types';
import { Util } from 'rainbow-foundation-tools';

export default class Radio extends KeyValue {

    constructor() {
        super();
        this.optionJson = null;
        this.id = null;
    }

    componentDidUpdate() {
        super.componentDidUpdate();


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

        this.initEvent();

    }



    renderInput() {
        return (<div className="radio" id={this.componentId}>{this.getDomArray()}</div>);
    }

    getName() {
        if (this.props.name) {
            return this.props.name;
        } else {
            return super.getName();
        }
    }

    getDomArray() {
        let _self = this, radioArray = [];
        let { codeTableId } = this.props;

        let optionJson = this.optionJson == null ? this.getOptionJson() : this.optionJson;

        if (optionJson || !codeTableId) {
            $.each(optionJson, function (index, element) {
                let key = element[config.DEFAULT_CODETABLE_KEYVALUE.KEY];
                let value = element[config.DEFAULT_CODETABLE_KEYVALUE.VALUE];
                _self.id = _.uniqueId(_self.componentId + "_");
                let radioItem = (
                    <label style={{ width: _self.props.itemWidth }} className="demo--label">
                        <input type="radio" className="form-control demo--radio" name={_self.getName()} id={_self.id} value={key} style={_self.props.style}
                            disabled={_self.getDisabled()} title={_self.getI18n(_self.props.title)} data-auto-test={_self.getNameForTest()} />
                        <label for={_self.id} className="demo--radioInput"></label>{value}
                    </label>
                );


                if (_self.props.displayStyle == "horizontal") {
                    radioArray.push(<div className="radio">{radioItem}</div>);

                    if (_self.props.itemSpacing != null && _self.props.itemSpacing != undefined) {
                        radioArray.push(<div style={{ paddingTop: _self.props.itemSpacing }}></div>);
                    }
                } else {
                    radioArray.push(radioItem);

                    if (_self.props.itemPerLine != undefined && (index + 1) % parseInt(_self.props.itemPerLine) == 0) {
                        radioArray.push(<br />);
                    }

                    if (_self.props.itemSpacing != null && _self.props.itemSpacing != undefined) {
                        radioArray.push(<span style={{ paddingLeft: _self.props.itemSpacing }} />);
                    }
                }
            });
        }

        return radioArray;
    }



    initValue() {
        let self = this;
        let value = this.getComponentValue();
        // if value was null, reset radio checked to false
        if (!value) {
            $("input:radio[name=" + self.getName() + "]").each(function (index, element) {
                let componentId = self.componentId;
                let elementId = element.id;
                if (elementId.substr(0, componentId.length) == componentId) {
                    element.checked = false;
                }
            });
            return
        }
        let optionJson = this.optionJson == null ? this.getOptionJson() : this.optionJson;
        if (optionJson) {
            $.each(optionJson, function (index, option) {
                let key = option[config.DEFAULT_CODETABLE_KEYVALUE.KEY];
                if (key == value) {
                    $("input:radio[name=" + self.getName() + "]").each(function (index, element) {
                        let componentId = self.componentId;
                        let elementId = element.id;
                        if (elementId.substr(0, componentId.length) == componentId && element.value == value) {
                            element.checked = true;
                        } else {
                            element.checked = false;
                        }
                    })
                }
            })
        }
    }

    getInputValue(event) {
        return event.target.value;
    }

    initEvent() {
        const self = this;
        let me = $("input:radio[id=" + this.id + "]");
        if (this.id) {
            me.unbind();
            me.bind("change", function (event) {
                self.setComponentValue(event);
                self.onChangeCallback(self);
            });
        }

    }

};

/**@ignore
 * Radio component prop types
 */
Radio.propTypes = $.extend({}, KeyValue.propTypes, {
    displayStyle: PropTypes.oneOf(["horizontal", "vertical"]),
    itemSpacing: PropTypes.string,
    itemWidth: PropTypes.string,
    name: PropTypes.string,
    itemPerLine: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
});

/**@ignore
 * Get Radio component default props
 */
Radio.defaultProps = $.extend({}, KeyValue.defaultProps, {
    componentType: "RADIO",
    displayStyle: "vertical",
    itemSpacing: null,
    itemWidth: null,
    itemPerLine: null
});
