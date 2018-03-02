import Input from "./Input";
import Param from "./Param";
import Event from "./Event";
import OnChangeEvent from '../event/OnChangeEvent';
import OnFocusEvent from '../event/OnFocusEvent';
import OnBlurEvent from '../event/OnBlurEvent';
import CodeTable from '../basic/CodeTable';
import { ComponentContext, PageContext } from "rainbow-foundation-cache";
import { Util } from "rainbow-foundation-tools";
import { CodeTableService } from "rainbow-foundation-codetable";
import config from "config";
import PropTypes from 'prop-types';

export default class KeyValue extends Input {

	componentWillMount() {
		super._componentWillMount();

		this.initCodeTable(this.props);

		this.onEvent = { newValue: this.getComponentValue(), oldValue: null };
	}

	componentDidMount() {
		super._componentDidMount();
		if (this.props.io != "out") {
			this.initCodeTableEvent();
			this.initProperty();
			this.initValidator();
			this.initComponent();
			Event.initEventListener(this);

			ComponentContext.put(this.componentId, this);
		}
	}

	componentWillUpdate(nextProps, nextState) {
		super._componentWillUpdate();
		this.initCodeTable(nextProps);
	}

	componentDidUpdate() {
		super._componentDidUpdate();
		if (this.props.io != "out") {
			$("input[name=" + this.componentId + "]").unbind();
			this.initCodeTableEvent();
			this.initProperty();
			this.initValidator();
			this.initComponent();
			Event.initEventListener(this);

			ComponentContext.put(this.componentId, this);
		}

	}

	saveCodetableNames(codeTableName, conditionMap) {
		let codetableNameMap = PageContext.get("rainbow-codetableName-map");
		let codetableMap = PageContext.get("rainbow-codetable-map");
		if (codetableNameMap) {
			conditionMap = conditionMap?conditionMap:{};
			codetableNameMap.set(this.buildKey(codeTableName,conditionMap),{ "CodeTableName": codeTableName, "ConditionMap": conditionMap ,"LangId":""});
			const selectList = codetableMap.get(this.buildKey(codeTableName,conditionMap));
			if (selectList) {
				selectList.push(this);
			} else {
				codetableMap.set(this.buildKey(codeTableName,conditionMap), [this]);
			}
		} else {
			codetableNameMap = new Map();
			codetableMap = new Map();
			conditionMap = conditionMap?conditionMap:{};
			codetableNameMap.set(this.buildKey(codeTableName,conditionMap),{ "CodeTableName": codeTableName, "ConditionMap": conditionMap ,"LangId":"" });
			codetableMap.set(this.buildKey(codeTableName,conditionMap), [this]);
			PageContext.put("rainbow-codetableName-map", codetableNameMap);
			PageContext.put("rainbow-codetable-map", codetableMap);
		}
	}

	buildKey(codeTableName,conditionMap){
		return codeTableName+JSON.stringify(conditionMap);
	}

    /**@ignore
     * Init codetable
     */
	initCodeTable(props) {
		let { codeTable } = (props == undefined) ? this.props : props;
		let parameters = this.props.parameters;

		if (parameters) {
			if (Util.isFunction(codeTable)) {
				this.codeTable = codeTable(parameters);
			} else {
				this.codeTable = new CodeTable([]).loadDataListAction(this.props.parameters);
			}
		} else {
			if (Util.isString(codeTable)) {
				this.codeTable = eval(codeTable);
			} else if (Util.isFunction(codeTable)) {
				this.codeTable = codeTable();
			} else {
				this.codeTable = codeTable;
			}
		}

		// if(codeTable != undefined){
		//  if(this.isString(codeTable)){
		//      this.codeTable = eval(codeTable);
		//  } else if(Util.isFunction(codeTable)){
		//      this.codeTable = codeTable();
		//  } else {
		//      this.codeTable = codeTable;
		//  }
		// } else if (this.props.parameters){
		//  this.codeTable = new CodeTable([]).loadDataListAction(this.props.parameters);
		// }
	}

    /**@ignore
     * Get option json
     */
	getOptionJson() {
		let _self = this, optionJson = null;

		if (this.props.codeTable != undefined || this.props.parameters) {
			// get codeTable object
			let codeTable = this.codeTable;

			// get select option json
			if (codeTable != null && codeTable != undefined) {
				if (this.props.io != "out" && this.props.parentId) {
					optionJson = codeTable.getCodeTableByForeignKey(this.props.foreignKey, this.getParentElement().val());
				} else if (codeTable != undefined) {
					optionJson = codeTable.getCode();
				}
			}
		}

		else if (this.props.dataSource != undefined) {
			let foreignKey = _self.props.foreignKey == undefined ? null : _self.props.foreignKey;
			this.state.showloading = true;
			AjaxUtil.doPost(
				this.props.dataSource,
				{ foreignKey: foreignKey },
				{
					async: this.props.async,
					done: function (data) {
						var codeTable = new CodeTable(data);
						if (this.props.io != 'out' && this.props.parentId) {
							optionJson = codeTable.getCodeTableByForeignKey(this.props.foreignKey, this.getParentElement().val());
						} else if (codeTable != undefined) {
							optionJson = codeTable.getCode();
						}
						this.state.showloading = false;
						//optionJson = codeTable.getCodeTableByForeignKey(_self.props.foreignKey, _self.getParentElement().val());
					}
				}
			);
		}

		return optionJson;
	}

    /**@ignore
     * Init code table event
     */
	initCodeTableEvent() {
		let _self = this;
		const object = $("input[name=" + this.componentId + "]");
		object.unbind();
		// handler input propertychange
		object.bind("input propertychange", (event) => {
			_self.setComponentValue(event);
		});

		// handle onchange event
		object.change(function (event) {
			_self.setComponentValue(event);

			let inputValue = _self.getEventNewValue(event);
			let valueChangeEvent = new OnChangeEvent(_self, event, Param.getParameter(_self), inputValue, null);
			if (_self.props.onChange) {
				_self.props.onChange(valueChangeEvent);
			}
			_self.clearValidationInfo(_self.props);

		});

		// handle onblur event
		if (this.props.onBlur) {
			object.blur(function (event) {
				_self.props.onBlur(new OnBlurEvent(_self, event, Param.getParameter(_self)));
			});
		}

		// handle onfocus event
		if (this.props.onFocus) {
			object.focus(function (event) {
				_self.props.onFocus(new OnFocusEvent(_self, event, Param.getParameter(_self)));
			});
		}
	}

	clearValidationInfo(nextProps) {
		const inputObjectLabel = $("label[for='" + this.componentId + "']");
		const inputObjects = $("input[name='" + this.componentId + "']");
		let flag = false;
		_.each(inputObjects, (inputObject) => {
			if ($(inputObject).is(':checked')) {
				flag = true;
			}
		});
		if (Util.parseBool(nextProps.required) && flag) {
			inputObjectLabel.next().next().remove();
		}
	}



    /**@ignore
     * Get codetable output value
     */
	getOutputValue() {

		let value = this.getComponentValue();
		let _self = this;
		let { codeTableId, conditionMap, codeTableName, url } = this.props;

		if (codeTableId || codeTableName) {
			if(!config.isNotShowCodetableIdWarning&&codeTableId){
                toastr["warning"]( this.countdown());
            }
			let getCode = codeTableId ? { "CodeTableId": codeTableId, "ConditionMap": conditionMap } : null;
			getCode = getCode ? getCode : codeTableName ? { "CodeTableName": codeTableName, "ConditionMap": conditionMap } : {};

			if (codeTableName || Util.parseBool(this.props.immediately)) {
				CodeTableService.getCodeTable(getCode).then((data) => {
					this.handler4Out(data, value);
				});
			} else {
				_self.saveCodetableNames(codeTableName, conditionMap);
			}

		} else if (url) {
			CodeTableService.fetchCodeTable(url).then((data) => {
				this.handler4Out(data, value);
			});
		} else {
			if (!_.isEmpty(this.codeTable)) {
				return this.codeTable.getValue(value);
			}
		}

	}

	handlerCheckBoxAndRadio4In(data) {
		const dataArray = [];
		const codetable_key = config["DEFAULT_CODETABLE_KEYVALUE"]["KEY"];
		const codetable_value = config["DEFAULT_CODETABLE_KEYVALUE"]["VALUE"];
		let codetable_api_key = config["DEFAULT_API_CODETABLE_KEYVALUE"]["KEY"];
		let codetable_api_value = config["DEFAULT_API_CODETABLE_KEYVALUE"]["VALUE"];
		let source = null;
		if (data &&!_.isEmpty(data.codes)) {
			codetable_api_key = config["DEFAULT_CODETABLE_KEYVALUE"]["KEY"];
			codetable_api_value = config["DEFAULT_CODETABLE_KEYVALUE"]["VALUE"];
			source = data.codes;
		} else if (data && !_.isEmpty(data.BusinessCodeTableValueList)) {
			source = data.BusinessCodeTableValueList;
		} else {
			console.error("codetable  can't find data.");
		}
		source.forEach(function (codeItem) {
			const code = {};
			code[codetable_key] = codeItem[codetable_api_key];
			code[codetable_value] = codeItem[codetable_api_value];
			dataArray.push(code);
		});
		this.optionJson = new CodeTable(dataArray, null, null).getCode();
		this.setState({ optionJson: this.optionJson });
	}

	handler4Out(data, value) {
		const dataArray = [];
		let codetable_key = config["DEFAULT_CODETABLE_KEYVALUE"]["KEY"];
		let codetable_value = config["DEFAULT_CODETABLE_KEYVALUE"]["VALUE"];
		let str = "";
		let source = null;
		if (data &&!_.isEmpty(data.codes)) {
			source = data.codes;
		} else if (data && !_.isEmpty(data.BusinessCodeTableValueList)) {
			codetable_key = config["DEFAULT_API_CODETABLE_KEYVALUE"]["KEY"];
			codetable_value = config["DEFAULT_API_CODETABLE_KEYVALUE"]["VALUE"];
			source = data.BusinessCodeTableValueList;
		} else {
			console.error("codetable  can't find data.");
		}
		if(source){
			let str = "";
			for(let i = 0 ; i < source.length; i++){
				let codeItem = source[i];
				if (value && value instanceof Array) {
					for (let i = 0; i < value.length; i++) {
						if (codeItem[codetable_key] == value[i]) {
							str += codeItem[codetable_value] + " ";
						}
					}
				} else if (codeItem[codetable_key] == value) {
					str = (codeItem[codetable_value]);
					break;
				}
			}
			$("#" + this.componentId).text(str);
		}
	}
    /**@ignore
     * Get checked
     */
	getChecked(key, value) {
		if (key == value) {
			return "checked";
		}
		return null;
	}

    /**@ignore
     * Get size style class, it's used by CheckboxButton & RadioButton
     */
	getSizeStyleClass() {
		if (this.props.size != null && this.props.size != undefined) {
			return " btn-group-" + this.props.size;
		}
		return "";
	}

    /**@ignore
     * Get active style class, it's used by CheckboxButton & RadioButton
     */
	getActiveStyleClass(inputValue, value) {
		return this.isKeyValueElement(inputValue, value) ? "active" : "";
	}

    /**@ignore
     * Get disabled style class, it's used by CheckboxButton & RadioButton
     */
	getDisabledStyleClass() {
		return (this.getDisabled() != null) ? "disabled" : "";
	}

    /**@ignore
     * Is key value element
     */
	isKeyValueElement(inputValue, value) {
		if (inputValue != null && Util.isArray(inputValue)) {
			for (let index in inputValue) {
				if (String(inputValue[index]) == value) {
					return true;
				}
			}
		} else {
			if (inputValue == value) {
				return true;
			}
		}
		return false;
	}

};


/**@ignore
 * KeyValue prop types
 */
KeyValue.PropTypes = $.extend({}, Input.propTypes, {
	codeTable: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	dataSource: PropTypes.string,
	codeTableId: PropTypes.string,
	codeTableName: PropTypes.string,
	immediately: PropTypes.boolean,
});

/**@ignore
 * Get KeyValue default props
 */
KeyValue.defaultProps = $.extend({}, Input.defaultProps, {
	immediately: true
});
