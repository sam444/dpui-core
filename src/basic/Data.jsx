import Component from "../basic/Component";
import Pagination from "../page/Pagination";
import r18n from "../i18n/reactjs-tag.i18n";
import config from "config";
import { ELUtil, Util, StringUtil } from "rainbow-foundation-tools";
import { PageContext } from "rainbow-foundation-cache";
import PropTypes from 'prop-types';
import { CodeTableService } from 'rainbow-foundation-codetable';

export default class Data extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPageIndex: 1,
            pageSize: this.props.pageSize ? this.props.pageSize : config.DEFAULT_DATATABLE_PAGESIZE,
            searchValue: null,
            sortColumn: null,
            sortWay: null, // asc|desc
            display: true,
            codeTableDataArray: []
        };
        this.currentPageIndex = 1;
    }

    static addRow(componentId) {
        PageContext.put(componentId + "_DataTableOperationStatus", "addRow");
    }

    static deleteRow(componentId) {
        PageContext.put(componentId + "_DataTableOperationStatus", "deleteRow");
    }

    componentDidMount() {
        const { children } = this.props;
        let childrenArray = [];
        if (children && children.length > 0) {
            childrenArray = childrenArray.concat(children);
        }
        this.getCodeTableData(childrenArray);
    }

    render() {
        this.initDataComponent();

        return (
            <div className={this.props.dataClass}>
                {this.renderData()}

                {this.renderFooter()}
            </div>
        );
    }

    /**
     * @ignore
     * Render panel right header
     */
    renderPanelRightHeader() {
        if (this.props.panelHeader != null && this.props.panelHeader != undefined) {
            return (
                <span style={{ float: "right" }}>{this.props.panelHeader}</span>
            );
        }
        return <noscript />;
    }

    /**@ignore
     * Render panel footer
     */
    renderPanelFooter() {
        if (this.props.panelFooter != null && this.props.panelFooter != undefined) {
            return (
                <div className="panel-footer">{this.props.panelFooter}</div>
            );
        }
        return <noscript />;
    }

    /**@ignore
     * Render data
     */
    renderData() {
        return <noscript />;
    }

    /**@ignore
     * Render 
     */
    renderFooter() {
        return (
            <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4" style={{ marginLeft: '-15px' }}>
                    {this.props.functions}
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8 paginationRow">
                    {this.renderPagination()}
                </div>
            </div>
        );
    }

    renderPagination() {
        if (Util.parseBool(this.props.pageable)) {
          if (!_.isEmpty(this.props.value) || ((this.props.provider&&this.props.provider.result) ? this.props.provider.result.length != 0 : false)) {
                return (
                    <Pagination id={this.componentId} renderDropDownList={this.renderDropDownList()} pageCount={this.pageCount}
                        currentPageIndex={this.state.currentPageIndex} onToPage={this.onToPage.bind(this)}
                        showPaginationNum={this.props.showPaginationNum} showGoToPage={this.props.showGoToPage} />
                );
            }
        }
    }

    renderBeforeData() {
        return (
            <div className="row tb-searchbar">
                {Util.parseBool(this.props.searchable) ? this.renderSearch() : null}
            </div>
        );
    }

    /**@ignore
     * Render data drop down list
     */
    renderDropDownList() {
        if (Util.parseBool(this.props.pageable)) {
            let dropDownArray = [];
            $.each(this.props.dropDownList, (index, element) => {
                let key = element, value = element;
                if (element == -1 || element == "All") {
                    key = -1;
                    value = r18n.Data.All;
                }

                dropDownArray.push(<option value={key}>{value}</option>);
            });

            return (
                <div>
                    <select value={this.state.pageSize} onChange={this.onDropDownChange.bind(this)}>{dropDownArray}</select>
                </div>
            );
        }
    }

    renderFunction() {
        return (
            <div
                className={Util.parseBool(this.props.searchable) ? "col-sm-6 col-md-6 col-lg-6" : "col-sm-12 col-md-12 col-lg-12"}
                style={{ textAlign: "right" }}>
                <div className="tbrightbtn">
                    {this.props.functions}
                </div>
            </div>
        );
    }




    renderSearch() {
        if (Util.parseBool(this.props.searchable)) {
            return (
                <div className="col-sm-6 col-md-6 col-lg-6" >
                    <span className='glyphicon glyphicon-search'></span>
                    <input type="text" onChange={this.onSearchData.bind(this)} />
                </div>
            );
        } else {
            <div className="col-sm-6 col-md-6 col-lg-6"></div>
        }
    }

    /**@ignore
     * Get value
     */
    getValue() {
        let { value } = this.props;
        return Util.isFunction(value) ? value(this) : value;
    }

    /**@ignore
     * Get provider
     */
    getProvider() {
        let { provider } = this.props;
        if (provider != undefined) {
            // let pageSize = this.state.pageSize;
            // //let pageIndex = (this.state.currentPageIndex - 1) * pageSize + 1;
            // let pageIndex = (this.currentPageIndex - 1) * pageSize + 1;
            // return provider(pageIndex, pageSize, this);
            return provider;
        }
    }

    /**@ignore
     * Get column value
     */
    getColumnValue(jsonData, name) {
        let value = jsonData;
        if (name != undefined && name != null && name != "") {
            /*$.each(name.split("."), function(index, element){
             if(value != undefined){
             value = value[element];
             }
             });
             return value;*/
            return eval("value." + name);
        }
        return name;
    }

    /**@ignore
     * Init data component
     */
    initDataComponent() {
        this.initDataValue();

        //this.initSort();
    }

    /**@ignore
     * Init data value
     */
    initDataValue() {
        let operationStatus = PageContext.get(this.componentId + "_DataTableOperationStatus");
        if (operationStatus) {
            this.updateStatus = operationStatus;
        }
        let pageSize = parseInt(this.state.pageSize);

        // handler data value
        if (this.props.value != undefined) {
            let value = this.getValue();
            value = this.initSort(value);
            value = this.initSearchData(value);
            if (this.updateStatus == "addRow") {
                this.currentPageIndex = Pagination.getPageCount(value.length, pageSize);
                this.state.currentPageIndex = Pagination.getPageCount(value.length, pageSize);
            }
            let pageIndex = parseInt((this.state.currentPageIndex - 1) * pageSize + 1);

            if (Util.parseBool(this.props.pageable)) {
                let pageValue = [];
                pageSize = (pageSize == -1) ? value.length : pageSize;
                for (let i = pageIndex - 1; i < value.length && i < (pageIndex - 1 + pageSize); i++) {
                    pageValue.push(value[i]);
                }
                if (this.updateStatus == "deleteRow" && pageValue.length == 0 && this.state.currentPageIndex > 1) {
                    this.state.currentPageIndex = this.state.currentPageIndex - 1;
                    this.currentPageIndex = this.state.currentPageIndex;
                    pageIndex = parseInt((this.state.currentPageIndex - 1) * pageSize + 1);
                    for (let i = pageIndex - 1; i < value.length && i < (pageIndex - 1 + pageSize); i++) {
                        pageValue.push(value[i]);
                    }
                }
                PageContext.remove(this.componentId + "_DataTableOperationStatus");
                this.pageValue = pageValue;
                this.pageCount = Pagination.getPageCount(value.length, pageSize);
            } else {
                this.pageValue = value;
                this.pageCount = 1;
            }
        }

        // handler data provider
        else {
            let provider = this.getProvider();

            if (provider != null && provider != undefined && provider != "") {
                this.pageValue = this.initSearchData(provider.result);
                this.pageValue = this.initSort(provider.result);
                this.pageCount = Pagination.getPageCount(provider.count, pageSize);
                this.state.pageSize = provider.pageSize ? provider.pageSize : config.DEFAULT_DATATABLE_PAGESIZE;
                this.state.currentPageIndex = provider.pageIndex ? provider.pageIndex : 1;
            }
        }
    }

    initSearchData(value) {
        const { children, searchable } = this.props;
        let childrenArray = [];
        if (children && children.length > 0) {
            childrenArray = childrenArray.concat(children);
        }
        if (Util.parseBool(searchable) && this.state.searchValue != undefined) {
            let _self = this;
            let codeTableData = [];
            let tempValueArray = _self.objDeepCopy(value);
            let codeTableDataArray = _self.state.codeTableDataArray;
            return _self.filterDataTable(childrenArray, value, tempValueArray, codeTableDataArray);
        }
        return value;
    }

    getCodeTableData(children) {
        let _self = this;
        let codeTableData = [];
        _.each(children, (child) => {
            let selectComponent = child.props.children;
            let field = child.props.value;
            if (selectComponent) {
                let { codeTableId, conditionMap, codeTableName, codeTable } = selectComponent.props;
                let { url, valueOption, property } = selectComponent.props;
                if (!field) {
                    field = property;
                }
                _self.getCodeTable(codeTableId, url, codeTableName, valueOption, codeTable, conditionMap, field);
            } else {
                let render = child.props.render;
                let codeTableDataSource = child.props.codeTableDataSource;
                if (render && Util.parseBool(_self.props.searchable) && Util.parseBool(_self.props.searchSelectValue)) {
                    let renderStr = render.toString().replace(/\s/g, "");
                    if (renderStr.indexOf("UISelect") != -1) {
                        let mapArray = _self.formatRenderStr(renderStr);
                        _.each(mapArray, (map) => {
                            let { name, codeTableId, conditionMap, codeTableName, codeTable } = map;
                            let { url, valueOption, property } = map;
                            if (name && codeTableDataSource) {
                                let data = codeTableDataSource[name];
                                if (data) {
                                    url = data["url"] ? data["url"] : url;
                                    codeTableName = data["codeTableName"] ? data["codeTableName"]: codeTableName;
                                    conditionMap = data["conditionMap"]? data["conditionMap"]: conditionMap;
                                    codeTable = data["codeTable"]? data["codeTable"]: codeTable;
                                    valueOption = data["valueOption"]? data["valueOption"]: valueOption;
                                    property = data["property"]? data["property"]: property;
                                }
                            }
                            _self.getCodeTable(codeTableId, url, codeTableName, valueOption, codeTable, conditionMap, property);
                        });
                    }
                }
            }
        });
        return codeTableData;
    }

    formatRenderStr(renderStr) {
        let _self = this;
        // replace special char
        renderStr = renderStr.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\||\\|\[|\]|\{|\}|\;|\"|\'|\<|\.|\>|\/|\?]/g, "");
        let renderStrArr = renderStr.split(",");
        let mapArray = [];
        for (var i = 0; i < renderStrArr.length; i++) {
            let str = renderStrArr[i];
            if (str.indexOf("UISelect") != -1) {
                mapArray.push({});
                continue
            }
            for (var j = 0; j < mapArray.length; j++) {
                if (j == mapArray.length - 1) {
                    let map = mapArray[j];
                    let strArr = str.split(":");
                    if (strArr.length == 2) {
                        map[strArr[0]] = strArr[1];
                    }
                }
            }
        }
        return mapArray;
    }

    getCodeTable(codeTableId, url, codeTableName, valueOption, codeTable, conditionMap, field) {
        let _self = this;
        let codeTableData = [];
        if (codeTableId) {
            if (!config.isNotShowCodetableIdWarning) {
                toastr["warning"](this.countdown());
            }
            CodeTableService.getCodeTable({ "CodeTableId": codeTableId, "ConditionMap": conditionMap }).then(function (data) {
                codeTableData = _self.handCodeTableData(data, field);
            });

        } else if (url) {
            CodeTableService.fetchCodeTable(url).then(function (data) {
                codeTableData = _self.handCodeTableData(data, field);
            });
        } else if (codeTableName) {
            CodeTableService.getCodeTable({ "CodeTableName": codeTableName, "ConditionMap": conditionMap }).then(function (data) {
                codeTableData = _self.handCodeTableData(data, field);
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
            codeTableData = _self.handCodeTableData(data, field);
        } else if (codeTable) {
            codeTableData = _self.handCodeTableData(codeTable, field);
        }
        return codeTableData;
    }

    handCodeTableData(data, field) {
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
                dataArray.push(code);
            });
        } if (data && data.BusinessCodeTableValueList && data.BusinessCodeTableValueList.length > 0) {
            data.BusinessCodeTableValueList.forEach(function (codeItem) {
                const code = {};
                code[codetable_key] = codeItem[codetable_api_key];
                code[codetable_value] = codeItem[codetable_api_value];
                dataArray.push(code);
            });
        } else if (Util.isArray(data)) {
            data.forEach(function (codeItem) {
                const code = {};
                code[codetable_key] = codeItem[codetable_api_key];
                code[codetable_value] = codeItem[codetable_api_value];
                dataArray.push(code);
            });
        }

        let codeTableDataArray = _self.state.codeTableDataArray;
        if (field) {
            let codeTableDataMap = {};
            codeTableDataMap[field] = dataArray;
            codeTableDataArray.push(codeTableDataMap);
            _self.setState({ codeTableDataArray: codeTableDataArray });
        }
        return dataArray;
    }

    filterDataTable(children, value, tempValueArray, codeTableDataArray) {
        let _self = this;
        let columnValue = [], valueArray = [];

        _.each(children, (child) => {
            let field = child.props.value;
            if (!field) {
                let selectComponent = child.props.children;
                if (selectComponent) {
                    filed = selectComponent.props.property;
                }
            }
            if (field) {
                columnValue.push(field);
            }
            let render = child.props.render;
            if (render) {
                let renderStr = render.toString().replace(/\s/g, "");
                if (renderStr.indexOf("UISelect") != -1) {
                    let mapArray = _self.formatRenderStr(renderStr);
                    _.each(mapArray, (map) => {
                        let { property } = map;
                        if (property) {
                            columnValue.push(property);
                        }
                    });
                }
            }
            columnValue = _self.unique(columnValue);
        });

        _.each(columnValue, (field) => {
            _.each(tempValueArray, (value) => {
                let target = value[field];
                _.each(codeTableDataArray, (codeTableDataMap) => {
                    let codeTableData = codeTableDataMap[field];
                    _.each(codeTableData, (data) => {
                        if (data.id == target) {
                            //replace code table id by text
                            value[field] = data.text;
                        };
                    });
                });
            });
        });

        $.each(tempValueArray, (index, element) => {
            $.each(columnValue, (index2, element2) => {
                let val = eval("element." + element2);
                if (val != null && val != undefined && String(val).toUpperCase().indexOf(StringUtil.trim(_self.state.searchValue).toUpperCase()) != -1) {
                    valueArray.push(value[index]);
                    return false;
                }
            });
        });
        return valueArray;
    }

    objDeepCopy(source) {
        var sourceCopy = source instanceof Array ? [] : {};
        for (var item in source) {
            sourceCopy[item] = typeof source[item] === 'object' ? this.objDeepCopy(source[item]) : source[item];
        }
        return sourceCopy;
    }

    unique(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }

    /**@ignore
     * Init sort
     */
    initSort(value) {
        let _self = this;
        let { sortColumn, sortWay } = this.state;
        //var menmers = ['Milo','Teana','Mary','King','Iroity'];
        //menmers.sort();
        //var numbers = [12,23,10,56,7,88,92,49];
        //numbers.sort(
        //	function(x, y){
        //		return (x - y);
        //	}
        //);

        if (sortColumn != undefined) {
            let sorter = null;

            // if no sorter specific in column
            sorter = sorter == null ? (function (a, b) {
                let v1 = eval("a." + sortColumn);
                let v2 = eval("b." + sortColumn);

                if (v1 == null) {
                    return v2 == null ? 0 : -1;
                } else if (v2 == null) {
                    return 1;
                } else {
                    //if (isNumberValue) {
                    // parse to number value
                    //    v1 *= 1;
                    //    v2 *= 1;
                    //}
                    // if (v1 > v2) {
                    //     return 1;
                    // } else if (v1 < v2) {
                    //     return -1;
                    // } else {
                    //     return 0;
                    // }
                    return _self.compareFunc(v1, v2);
                }
            }) : sorter;

            if (sortWay == "asc") {
                value.sort(sorter);
            } else {
                value.sort(function (a, b) {
                    return 0 - sorter(a, b);
                });
            }
        }
        return value;
    }

    compareFunc(param1, param2) {
        let _param1 = Number(param1);
        let _param2 = Number(param2);
        if(!isNaN(_param1)){
            param1 = _param1;
        }
        if(!isNaN(_param2)){
            param2 = _param2;
        }
        //如果两个参数均为字符串类型
        if (typeof param1 == "string" && typeof param2 == "string") {
            return param1.localeCompare(param2);
        }
        //如果参数1为数字，参数2为字符串
        if (typeof param1 == "number" && typeof param2 == "string") {
            return -1;
        }
        //如果参数1为字符串，参数2为数字
        if (typeof param1 == "string" && typeof param2 == "number") {
            return 1;
        }
        //如果两个参数均为数字
        if (typeof param1 == "number" && typeof param2 == "number") {
            if (param1 > param2) return 1;
            if (param1 == param2) return 0;
            if (param1 < param2) return -1;
        }
    }

    getDisabledStyleClass() {
        if (ELUtil.parseBoolValue(this.props.disabled)) {
            return "disabled";
        }
        return null;
    }

    /**@ignore
     * On to page
     */
    onToPage(currentPageIndex) {
        if (this.props.providerCall) {
            this.state.currentPageIndex = currentPageIndex;
            this.props.providerCall(null, this.state.currentPageIndex, this.state.pageSize);
        } else {
            this.currentPageIndex = currentPageIndex;
            this.setState({ currentPageIndex: currentPageIndex });
        }

        this.updateStatus = "Page";
        PageContext.put(this.componentId + "_currentPageIndex", currentPageIndex);
    }

    /**@ignore
     * On drop down change
     */
    onDropDownChange(event) {
        this.updateStatus = "DropDownChange";
        this.state.currentPageIndex = 1;
        if (this.props.providerCall) {
            this.state.pageSize = event.target.value;
            this.props.providerCall(null, 1, this.state.pageSize);
        } else {
            this.setState({ currentPageIndex: 1, pageSize: event.target.value });
            this.currentPageIndex = 1;
        }
    }

    /**@ignore
     * On search data
     */
    onSearchData(event) {
        this.setState({ currentPageIndex: 1, searchValue: event.target.value });

        this.updateStatus = "Search";
        this.currentPageIndex = 1;
    }

};


/**@ignore
 * Data component prop types
 */
Data.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    provider: PropTypes.string,
    selectionMode: PropTypes.oneOf(["single", "multiple"]),
    displayLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    headerTitle: PropTypes.string,
    dataClass: PropTypes.string,
    pageSize: PropTypes.string,
    selectState: PropTypes.array, //eg: [0, 1, 2, 3]
    dropDownList: PropTypes.array,
    styleClass: PropTypes.oneOf(["default", "primary", "success", "warning", "danger", "info"]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    indexable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    headerable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    detailable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    sortable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    pageable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    searchable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    searchSelectValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    functions: PropTypes.func,
    panelHeader: PropTypes.object,
    panelFooter: PropTypes.object,
};

/**@ignore
 * Get data component default props
 */
Data.defaultProps = {
    styleClass: config.DEFAULT_STYLE_CLASS,
    displayLength: 10,
    disabled: false,
    indexable: false,
    headerable: false,
    sortable: false,
    pageable: true,
    detailable: false,
    searchable: false,
    searchSelectValue: true,
    selectionMode: null,
    selectState: null,
    pageSize: config.DEFAULT_DATATABLE_PAGESIZE,
    dropDownList: config.DEFAULT_DATATABLE_DROPDOWNLIST
};