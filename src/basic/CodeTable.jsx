import config from 'config';
import {Util} from "rainbow-foundation-tools";
import {SessionContext,ComponentContext} from "rainbow-foundation-cache";

export default class CodeTable {

    /**
     * @ignore
     * construct code table
     *  codeTableArray array of json object, eg: {id:"1", text:"text"}
     *  renderer optional
     *  sorter {CodeTableSorter} optional
     */
    constructor(codeTableArray, renderer, sorter, api, param) {
        const _self = this;
        if (codeTableArray != null) {
            this.buildCodeTable(codeTableArray, renderer, sorter);
        }else {
            throw new Error("codeTableArray  is null!");
        }

    }

    buildCodeTable(codes, renderer, sorter) {
        let map = {};
        this.codes = codes;
        this.codes.forEach(function (code) {
            map[code[config.DEFAULT_CODETABLE_KEYVALUE.KEY]] = code;
            if (renderer) {
                code[config.DEFAULT_CODETABLE_KEYVALUE.VALUE] = renderer(code);
            }
        });

        this.map = map;
        if (sorter) {
            sorter.sort(this.codes);
        }
    }

    
    getCode() {
        return this.codes;
    }

 
    getMap() {
        return this.map;
    }

    getKey(value) {
        let key = null;
        this.codes.forEach(function (code) {
            if (code[config.DEFAULT_CODETABLE_KEYVALUE.VALUE] == value) {
                key = code[config.DEFAULT_CODETABLE_KEYVALUE.KEY];
                return;
            }
        });
        return key;
    }

  
    getValue(keyArray) {
        let _self = this, valueArray = [];
        if (keyArray != null && keyArray != undefined) {
            if (Util.isArray(keyArray)) {
                $.each(keyArray, (index, element) => {
                    if (_self.map[element]) {
                        valueArray.push(_self.map[element][config.DEFAULT_CODETABLE_KEYVALUE.VALUE]);
                    }
                });
            } else {
                if (this.map[keyArray]) {
                    valueArray.push(this.map[keyArray][config.DEFAULT_CODETABLE_KEYVALUE.VALUE]);
                }
            }
        }

        return valueArray;
    }

  
    getCodeTableByForeignKey(foreignKey, parentValue) {
        let codeList = [];

        if (foreignKey == null) {
            return this.codes;
        }

        if (parentValue != undefined) {
            this.codes.forEach(function (code) {
                if (parentValue == code[foreignKey]) {
                    codeList.push(code);
                }
            });
            return codeList;
        }

        return {};
    }

    loadDataListAction(parameters) {
        let codeTableId = parameters.codeTableId;
        let conditionMap = parameters.conditionMap;
        let isChild = parameters.isChild;
        let componentId = parameters.componentId;
        let dataConditionUrl = parameters.dataConditionUrl;
        let dataListUrl = parameters.dataListUrl;

        let cacheId = "dataListById_" + codeTableId;
        if (isChild) {
            cacheId += isChild;
        }
        if (conditionMap) {
            cacheId += JSON.stringify(conditionMap);
        }

        if (SessionContext.get(cacheId) != null) {
            return SessionContext.get(cacheId);
        }

        let async = false;
        if (componentId) {
            async = true;
            if (SessionContext.get(codeTableId) != null && SessionContext.get(codeTableId).length > 0) {
                let componentList = SessionContext.get(codeTableId);
                componentList.push(componentId);
                SessionContext.put(codeTableId, componentList);
                return new CodeTable([]);
            }
            SessionContext.put(codeTableId, [componentId]);
        }

        let codeTableList = [];
        this.loadDataListService(codeTableId, conditionMap, dataConditionUrl, dataListUrl, async).then(
            function (dataList) {
                console.log("dataList", dataList);
                dataList.map(function (data, index) {
                    if (isChild && data.ConditionFields != null && data.ConditionFields.length > 0) {
                        data.ConditionFields.map(function (condition, index) {
                            codeTableList.push({id: data.Id, text: data.Description, Parent: condition.ParentId});
                        });
                    } else {
                        codeTableList.push({id: data.Id, text: data.Description});
                    }
                });
                SessionContext.put(cacheId, new CodeTable(codeTableList));
                if (async) {
                    let componentList = SessionContext.get(codeTableId);
                    for (let i = 0; i < componentList.length; i++) {
                        ComponentContext.forceUpdate(componentList[i]);
                        SessionContext.remove(codeTableId);
                    }
                }
            },
            function (err) {
                if (err.status != 200) {
                    MessageHelper.error(err.statusText, "CodeTable->DataList Load Error,id: " + codeTableId);
                }
            }
        );
        if (codeTableList == null) {
            codeTableList = [];
        }

        return new CodeTable(codeTableList);
    }

    loadDataListService(codeTableId, conditionMap, dataConditionUrl, dataListUrl, async){
        let url = null;
        if(conditionMap != null){
            let param = conditionMap;
            url = dataConditionUrl + codeTableId;
            return AJAXUtil.call(url, param, {method:'POST', async:async});
        } else {
            url = dataListUrl + codeTableId;
            return AJAXUtil.call(url, null, {method:'GET', async:async});
        }
    }
}
