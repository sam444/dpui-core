import KeyValue from "../basic/KeyValue";
import Event from "../basic/Event";
import Param from "../basic/Param";
import OnFocusEvent from '../event/OnFocusEvent';
import r18n from '../i18n/reactjs-tag.i18n';
import config from "config";
import CodeTable from '../basic/CodeTable';
import { CodeTableService } from "rainbow-foundation-codetable";
import { ComponentContext, PageContext } from "rainbow-foundation-cache";
import { Util } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';
import OnChangeEvent from '../event/OnChangeEvent';
import OnBlurEvent from '../event/OnBlurEvent';

export default class Select extends KeyValue {

    
    constructor() {
        super();
        this.immediately = false;
    }
    
    renderInput() {
        return (
            <select id={this.componentId} name={this.getName()} className="form-control"
                style={this.props.style} defaultValue={this.props.defaultValue} title={this.getI18n(this.props.title)}
                data-auto-test={this.getNameForTest()}>
                <option value="r-loading">{this.props.blankOption}</option>
            </select>
        );
    }

    resetSelect() {
        const option = {
            templateResult: (state) => {
                if (state.id != "r-loading") {
                    return state.text;
                } else {
                    const $state = $(
                        '<span class="select-loading"><img src="data:image/gif;base64,R0lGODlhMAAwALMKALS0tNTU1Ovr66enp9/f38nJyeDg4KmpqcPDw////////wAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTkxRUZBMUNEMEQzMTFFNjlGMDhCQzVFRjVDODFFNEIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTkxRUZBMUREMEQzMTFFNjlGMDhCQzVFRjVDODFFNEIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxOTFFRkExQUQwRDMxMUU2OUYwOEJDNUVGNUM4MUU0QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxOTFFRkExQkQwRDMxMUU2OUYwOEJDNUVGNUM4MUU0QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t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" class="img-flag"/></span>'
                    );
                    return $state;
                }
            }
        }

        if (Util.parseBool(this.props.autoComplete)) {
            
            if (Util.parseBool(this.props.multiSelect)) {
                $("#" + this.componentId).select2($.extend(true, { minimumResultsForSearch: Infinity, multiple: true }, option));
            } else {
                $("#" + this.componentId).select2(option);
            }
        } else {
            if (Util.parseBool(this.props.multiSelect)) {
                $("#" + this.componentId).select2($.extend(true, { minimumResultsForSearch: Infinity, multiple: true }, option));
            } else {
                $("#" + this.componentId).select2($.extend(true, { minimumResultsForSearch: Infinity }, option));
            }
        }

    }

    initSelect() {
        if (this.props.io != "out") {
            this.initDisabled();
            this.resetSelect();
            // this.initEvent();
            this.initValidator();
            this.fillSelectOption();
            this.initReadOnly();
            // $("#" + this.componentId).unbind();
            // Event.initEventListener(this);
        }
    }

    updateSelect(){
        if (this.props.io != "out") {
            this.initDisabled();
            let select2Obj = $("#"+this.componentId).next();
            if((select2Obj.length==0) && this.props.visibled){
                this.resetSelect();
            }
            // this.initEvent();
            this.initValidator();
            this.fillSelectOption();
            this.initReadOnly();
            // $("#" + this.componentId).unbind();
            // Event.initEventListener(this);
        }
    }

    initDisabled() {
        const select2Obj = $("#" + this.componentId);
        if (Util.parseBool(this.getProperty("disabled")) || !Util.parseBool(this.getProperty("enabled"))){
            select2Obj.prop("disabled", true);
            // for IE10
            select2Obj.next().addClass("select2-container--disabled")
        }else{
            select2Obj.prop("disabled", false);
            // for IE10
            select2Obj.next().removeClass("select2-container--disabled")
        }
    }

    componentDidMount() {
        ComponentContext.put(this.componentId, this);
        super._componentDidMount();

        this.initSelect();
        this.initComponentEvent();

        if (!_.isEmpty(this.props.style)) {
            const selectObject = $("#" + this.componentId);
            const select2Object = $("#select2-" + this.componentId + "-container");
            select2Object.attr("style", selectObject.attr("style"));
        }

    }

    componentDidUpdate(prevProps, prevState) {
        ComponentContext.put(this.componentId, this);
        super._componentDidUpdate();

        // if (Util.parseBool(prevProps.autoComplete)) {
        //     $("#select2-" + this.componentId + "-container").closest(".select2").remove();
        // }
        //remove event
        const select2Obj = $("#" + this.componentId);
        select2Obj.off("select2:open");
        select2Obj.off("change");
        
        this.updateSelect();
        this.initComponentEvent();
    }

    initValue() {
        if (!Util.parseBool(this.props.showBlankOption) && !Util.parseBool(this.props.multiSelect)) {
            this.setComponentValue();
        }

        super.initValue();
    }

    getInputValue(event) {
        //let inputRef = this.getInputRefProperty();
        if (Util.parseBool(this.props.multiSelect)) {
            let valueArray = [];
            let myselect = document.getElementById(this.componentId);
            for (let i = 0; i < myselect.length; i++) {
                if (myselect.options[i].selected == true) {
                    valueArray.push(myselect.options[i].value);
                }
            }
            return valueArray;
        }
        //return React.findDOMNode(this.refs[inputRef]).value;

        return $("#" + this.componentId).val();
    }

    initComponentEvent() {
        let _self = this;
        $("#" + this.componentId).on("select2:open", function () {
            if (_self.props.onFocus) {
                _self.props.onFocus(new OnFocusEvent(_self, event, Param.getParameter(_self), null, null));
            }
            const selectObject = $("#" + _self.componentId);
            const select2Object = $("#select2-" + _self.componentId + "-container");
            select2Object.attr("title", selectObject.attr("title"));
        });




        $("#" + this.componentId).on("change", function (event, data) {

            // trigger component change after fill select option
            _self.setComponentValue(event);
            _self.fillSelectOption();

            if (_self.props.onChange) {
                _self.onChangeCallback(_self);
            }
            let childrenId = _self.props.childrenId;
            if (childrenId != null && childrenId != "" && childrenId != undefined) {
                let childrenArray = childrenId.split(",");

                $.each(childrenArray, function (index, element) {
                    $("#" + element).trigger("change", { eventName: "parentTrigger" });
                });
            }

            _self.clearValidationInfo(_self.props);
        });



        // $("#" + this.componentId).change(function (event, data) {
        //     if (data != undefined && data.eventName == "parentTrigger") {
        //         _self.fillSelectOption();
        //     }

        //     // trigger component change after fill select option
        //     _self.setComponentValue(event);
        //     if (_self.props.onChange) {
        //         _self.onChangeCallback(_self);
        //     } 
        //     let childrenId = _self.props.childrenId;
        //     if (childrenId != null && childrenId != "" && childrenId != undefined) {
        //         let childrenArray = childrenId.split(",");

        //         $.each(childrenArray, function (index, element) {
        //             $("#" + element).trigger("change", { eventName: "parentTrigger" });
        //         });
        //     }

        //     _self.clearValidationInfo(_self.props);

        // });
    }

    setOption(self, selfElement, optionJson) {
        let valueTemp = self.getComponentValue();
        let oneItemAutoSelect = self.props.oneItemAutoSelect;
        let needbind = false;
        if (selfElement && selfElement['length'] > 1) {
            selfElement.empty();
        }
        let option = [];
        if (Util.parseBool(this.props.showBlankOption)) {
            option.push('<option value="">' + this.props.blankOption + '</option>');
        }
        if (_.size(optionJson) == 1 && self.props.model && self.props.property) {
            needbind = true;
        }
        $.each(optionJson, (index, element) => {
            let key = element[config.DEFAULT_CODETABLE_KEYVALUE.KEY];
            let value = element[config.DEFAULT_CODETABLE_KEYVALUE.VALUE];
            let annotation = element["Annotation"]?element["Annotation"]:"";

            if (value) {
                value = value.replace(new RegExp(/</g), "&lt;");
            }
            if (needbind  && Util.parseBool(oneItemAutoSelect)) {

                if (self.props.onChange && !self.props.model[self.props.property]) {
                    let newValue = null;
                    if (Util.parseBool(self.props.multiSelect)) {
                        newValue = [key];
                    } else {
                        newValue = key;
                    }
                    self.props.onChange(new OnChangeEvent(self, null, {}, newValue, null));
                }
                if (Util.parseBool(self.props.multiSelect)) {
                    self.props.model[self.props.property] = [key];
                } else {
                    self.props.model[self.props.property] = key;
                }
            }
            if ((needbind && Util.parseBool(oneItemAutoSelect))  || self.isKeyValueElement(valueTemp, key)) {
                option.push('<option title="'+annotation+'" value="' + key + '" selected>' + value + '</option>');
            } else {
                option.push('<option title="'+annotation+'" value="' + key + '">' + value + '</option>');
            }
        });
        if (self.props.groups) {
            const groupsArray = [];
            _.each(self.props.groups, (group) => {
                groupsArray.push('<optgroup label=' + self.getI18n(group.title) + '>');
                _.slice(option, group.start, group.end ? group.end : option.length).forEach((opt) => {
                    groupsArray.push(opt);
                });
                groupsArray.push('</optgroup>');
            });
            selfElement.html(groupsArray.join(""));
        } else {
            selfElement.html(option.join(""));
        }
    }

    // sortArrayByCache(codeTableId, dataArray) {
    //     let autosort = localStorage.gettItem(config.DEFAULT_LOCALSTORAGE_AUTOSORT_SELECT, value);
    //     if (!autosort) return;
    //     const browser = $.browser();
    //     let temp = autosort.filter(e => e.codeTableId === codeTableId && e.browser === browser);
    //     if (temp.length <= 0) return;
    //     temp = dataArray.filter(e => e.value === autosort.value);
    //     if (temp.length <= 0) return;
    //     dataArray.split(temp[0]);
    //     dataArray.push(temp[0]);
    //     this.setState({
    //         existcache: true
    //     })
    //     return dataArray;
    // }

    handlerSelect4In(data, selfElement) {
        let _self = this;
        let dataArray = [];
        const codetable_key = config["DEFAULT_CODETABLE_KEYVALUE"]["KEY"];
        const codetable_value = config["DEFAULT_CODETABLE_KEYVALUE"]["VALUE"];
        const codetable_api_key = config["DEFAULT_API_CODETABLE_KEYVALUE"]["KEY"];
        const codetable_api_value = config["DEFAULT_API_CODETABLE_KEYVALUE"]["VALUE"];
        if (data && data.codes && data.codes.length > 0) {
            data.codes.forEach(function (codeItem) {
                const code = {};
                code[codetable_key] = codeItem[codetable_key];
                code[codetable_value] = codeItem[codetable_value];
                code["Annotation"] = codeItem["Annotation"];
                dataArray.push(code);
            });
            // _self.setOption(_self, selfElement, new CodeTable(dataArray, null, null).getCode());
        } if (data && data.BusinessCodeTableValueList && data.BusinessCodeTableValueList.length > 0) {
            data.BusinessCodeTableValueList.forEach(function (codeItem) {
                const code = {};
                code[codetable_key] = codeItem[codetable_api_key];
                code[codetable_value] = codeItem[codetable_api_value];
                code["Annotation"] = codeItem["Annotation"];
                dataArray.push(code);
            });
            // _self.setOption(_self, selfElement, new CodeTable(dataArray, null, null).getCode());
        } else if (Util.isArray(data)) {
            data.forEach(function (codeItem) {
                const code = {};
                code[codetable_key] = codeItem[codetable_api_key];
                code[codetable_value] = codeItem[codetable_api_value];
                code["Annotation"] = codeItem["Annotation"];
                dataArray.push(code);
            });
        }
        _self.setOption(_self, selfElement, new CodeTable(dataArray, null, null).getCode());

    }

    fillSelectOption() {
        let _self = this;
        let selfElement = this.getSelfElement(this.componentId);
        //selfElement.empty();
        let { codeTableId, conditionMap, codeTableName } = this.props;
        let urlObject = this.props.url;
        let valueOption = this.props.valueOption;
        if (codeTableId) {
            if(!config.isNotShowCodetableIdWarning){
                toastr["warning"]( this.countdown());
            }
            CodeTableService.getCodeTable({ "CodeTableId": codeTableId, "ConditionMap": conditionMap }).then(function (data) {
                _self.handlerSelect4In(data, selfElement);
            });
        } else if (urlObject) {
            CodeTableService.fetchCodeTable(urlObject).then(function (data) {
                _self.handlerSelect4In(data, selfElement);
            });
        } else if (codeTableName) {
                CodeTableService.getCodeTable({ "CodeTableName": codeTableName, "ConditionMap": conditionMap }).then(function (data) {
                    _self.handlerSelect4In(data, selfElement);
                });
        } else if (valueOption) {
            const codetable_api_key = config["DEFAULT_API_CODETABLE_KEYVALUE"]["KEY"];
            const codetable_api_value = config["DEFAULT_API_CODETABLE_KEYVALUE"]["VALUE"];
            let data = [];
            valueOption.forEach(function (value) {
                const dataMap = {};
                var n = Number(value);
                if (!isNaN(n)) {
                    value = _self.formatNumber(value);
                }
                dataMap[codetable_api_key] = value;
                dataMap[codetable_api_value] = value;
                data.push(dataMap);
            });
            _self.handlerSelect4In(data, selfElement);
        } else {
            let optionJson = this.getOptionJson();
            if (optionJson) {
                _self.setOption(_self, selfElement, optionJson);
            }
        }
    }

    /*** Get parent element */
    getParentElement() {
        if (this.props.parentType == 'radio') {
            return $('[name="' + this.props.parentId + '"]:checked');
        }
        return $("#" + this.props.parentId);
    }

    /*** Get self element */
    getSelfElement(componentId) {
        return $("#" + this.componentId);
    }

    /*** Get children element */
    getChildrenElement() {
        return $("#" + this.props.childrenId);
    }

    clearValidationInfo(nextProps) {
        const inputObject = $("#" + this.componentId);
        const errorInputObject = inputObject.closest(".form-group");
        if (Util.parseBool(nextProps.required) && inputObject.val()) {
            if (errorInputObject.hasClass("has-error")) {
                let select2Obj = inputObject.siblings('span.select2');
                let select2Selection = select2Obj.find('span.select2-selection');
                if (select2Selection && select2Selection.hasClass('select2-validation')) {
                    select2Selection.removeClass("select2-validation");
                }
            }
        }
        if(Util.parseBool(nextProps.required) && !inputObject.val()){
            if (errorInputObject.hasClass("has-success")) {
                let select2Obj = inputObject.siblings('span.select2');
                let select2Selection = select2Obj.find('span.select2-selection');
                if (select2Selection && !select2Selection.hasClass('select2-validation')) {
                    select2Selection.addClass("select2-validation");
                }
            }
        }
    }

    /**@ignore
	 * Format Number
	 */
    formatNumber(str) {
        var newStr = "";
        var count = 0;
        if (str.indexOf(".") == -1) {
            for (var i = str.length - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            return newStr;
        }
        else {
            for (var i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 == 0 && count != 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; //逐个字符相接起来
                }
                count++;
            }
            str = newStr + str.substr(str.indexOf("."));
            return str;
        }
    }

};


/**@ignore
* Select component prop types
*/
Select.propTypes = $.extend({}, KeyValue.propTypes, {
    parentId: PropTypes.string,
    childrenId: PropTypes.string,
    foreignKey: PropTypes.string,
    autoComplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    multiSelect: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    showBlankOption: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    blankOption: PropTypes.string,
    parentType: PropTypes.string,
    url: PropTypes.string,
    parameters: PropTypes.object,
    async: PropTypes.bool.isRequired,
    autosort: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
    oneItemAutoSelect: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
});


/**@ignore
* Get Select component default props
*/
Select.defaultProps = $.extend({}, KeyValue.defaultProps, {
    blankOption: r18n.BlankOption,
    showBlankOption: true,
    multiSelect: false,
    autoComplete: false,
    parentType: "select",
    width: "100%",
    async: false,
    autosort: false,
    oneItemAutoSelect: true
});