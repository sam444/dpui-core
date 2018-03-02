import Data from "../basic/Data";
import SelectionMode from "./SelectionMode";
import OnRowSelectEvent from '../event/OnRowSelectEvent';
import config from "config";
import UniqueId from '../basic/UniqueId';
import r18n from "../i18n/reactjs-tag.i18n";
import { PageContext, ValidatorContext, ComponentContext } from 'rainbow-foundation-cache';
import { Util, ELUtil } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';
import Spinner from "../display/Spinner";
export default class DataTable extends Data {

    constructor(props) {
        super(props);
        this.isClick = true;
        this.showPagination = true;
        this.timer = {};
    }

    /**@ignore
     * Get selected record
     */
    static getSelectedRecord(dataTableId) {
        let recordArray = [];

        // handler single select
        $("input:radio[name=" + dataTableId + "_single" + "]").each(function (index, element) {
            if (element.checked) {
                let tableRow = $(element).closest("tr");
                recordArray.push(JSON.parse($(tableRow).attr("data-value")));
            }
        });

        // handler multiple select
        $("input:checkbox[name=" + dataTableId + "_multiple" + "]").each(function (index, element) {
            if (element.checked) {
                let tableRow = $(element).closest("tr");
                recordArray.push(JSON.parse($(tableRow).attr("data-value")));
            }
        });

        return recordArray;
    }

    renderData() {
        return (
            <div className={this.props.className} style={{ width: "auto" }}>
                {this.renderBeforeData()}
                {this.renderDropList()}
                {this.renderTable()}
            </div>
        );
    }

    renderDropList() {
        if (!Util.parseBool(this.props.isColumnCustomDisp)) return;
        if (this.props.children.length <= 0) return;
        return (
            <div class="fixed-table-toolbar">
                <div class="columns columns-right btn-group pull-right">
                    <div class="keep-open btn-group" title="Columns">
                        <button type="button" aria-label="columns" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                            <i class="glyphicon glyphicon-th icon-th"></i>
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            {
                                this.props.children.filter(e => e.props.value).map(e => (
                                    <li role="menuitem"><label><input type="checkbox" value={e.props.headTitle} onClick={this.handleClick} checked={e.state.display} />{e.props.headTitle}</label></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    /**@ignore
     * Render table
     */
    renderTable() {

        //<caption />
        let table_class = "table dttable table-responsive";
        if (this.props.thBreakAll == 'true' && this.props.tdBreakAll == 'false') {
            table_class = "table dttable table-responsive thBreakAll";
        }
        if (this.props.thBreakAll == 'true' && this.props.tdBreakAll == 'true') {
            table_class = "table dttable table-responsive thBreakAll tdBreakAll";
        }
        if (this.props.thBreakAll == 'false' && this.props.tdBreakAll == 'true') {
            table_class = "table dttable table-responsive tdBreakAll";
        }

        return (
            <table id={this.componentId} className={table_class} data-auto-test={this.getNameForTest()}>

                {this.props.renderTableHeader ? this.props.renderTableHeader() : <thead><tr>{this.renderTableHeader()}</tr></thead>}

                <tbody>{this.renderTableBody()}</tbody>
            </table>
        )
    }

    /**@ignore
     * Render table header
     */
    renderTableHeader() {
        let _self = this, tableHeaderArray = [], index = 0;
        const arr_fix = this.props.fixedColumns.split(',')

        // handler page index
        if (Util.parseBool(this.props.indexable)) {
            tableHeaderArray.push(<th style={{ width: "20px" }} />);
        }

        // handler single and multiple selected
        if (this.props.selectionMode == "single") {
            tableHeaderArray.push(<th vis></th>);
        } else if (this.props.selectionMode == "multiple") {
            tableHeaderArray.push(
                <th>
                    <input type="checkbox" id={this.componentId + "_multiple_selectall"}
                        name={this.componentId + "_multiple_selectall"} />
                </th>
            );
        }

        React.Children.forEach(this.props.children, function (child) {
            if (child.props.selectionMode == "single") {
                tableHeaderArray.push(<th></th>);
            } else if (child.props.selectionMode == "multiple") {
                tableHeaderArray.push(
                    <th>
                        <input type="checkbox" id={_self.componentId + "_multiple_selectall"}
                            name={_self.componentId + "_multiple_selectall"} disabled={_self.getDisabledStyleClass()} />
                    </th>
                );
            } else {
                let style = {
                    width: child.props.width,
                    display: child.props.display ? '' : 'none',
                    position: _.indexOf(arr_fix, index.toString()) ? 'fixed' : 'static'
                };
                tableHeaderArray.push(
                    <th data-field={child.props.value ? child.props.value : ""} style={{ width: child.props.width, textAlign: child.props.align }}>
                        {child.props.headerTitle ? !Util.isString(child.props.headerTitle) || Util.parseBool(child.props.noI18n) ? child.props.headerTitle : _self.getI18n(child.props.headerTitle) : ""}
                        {_self.renderTableHeaderSortIcon(child)}
                        {_self.renderRequired(child)}
                        {_self.renderHelpText(child)}
                    </th>
                );
                index++;
            }
        });

        // handler row detail
        if (Util.parseBool(this.props.detailable)) {
            if (this.props.detailSecquence) {
                tableHeaderArray.splice(Number(this.props.detailSecquence), 0, <th />);
            } else {
                tableHeaderArray.push(<th />);
            }
        }

        return tableHeaderArray;
    }

    renderHelpText(column) {
        if (column.props.helpText) {
            return (
                <span className="glyphicon glyphicon-question-sign"
                    data-toggle="tooltip" data-placement="top" title={this.getI18n(column.props.helpText)}
                    style={{ paddingLeft: "5px", color: "#ed9c28" }}>
                </span>
            );
        }
    }

    renderRequired(column) {
        if (Util.parseBool(column.props.required)) {
            return (
                <span className="glyphicon glyphicon-asterisk" style={{ paddingLeft: "5px", color: "#ff5555", transform: "scale(0.7)" }}>
                </span>
            );
        }
    }

    /**@ignore
     * Render table header sort icon
     */
    renderTableHeaderSortIcon(column) {
        if (Util.parseBool(column.props.sortable) || (column.props.sortable == undefined && Util.parseBool(this.props.sortable))) {
            let value = column.props.value || column.props.sortValue;

            if (this.state.sortColumn == value) {
                if (this.state.sortWay == "desc") {
                    // 降序 => 从大到小
                    return (<a href="javascript:void(0);" data-value={value} onClick={this.onSort.bind(this)}
                        className="ui-table-header-sort pull-right glyphicon glyphicon-triangle-bottom datatable-sort-icon-position" />);
                } else if (this.state.sortWay == "asc") {
                    // 升序 => 从小到大
                    return (<a href="javascript:void(0);" data-value={value} onClick={this.onSort.bind(this)}
                        className="ui-table-header-sort pull-right glyphicon glyphicon-triangle-top datatable-sort-icon-position" />);
                }
            }
            return (<a href="javascript:void(0);" data-value={value} onClick={this.onSort.bind(this)}
                className="ui-table-header-sort pull-right glyphicon glyphicon-sort datatable-sort-icon-position" />);
        }
    }
    /**@ignore
     * Render table body
     */
    renderTableBody() {
        let _self = this;
        let tableBodyArray = [], tableTD = [];
        //let value = this.pageValue;
        if (this.pageValue) {
            let selectState = this.getProperty("selectState");
            let pageIndex = this.currentPageIndex;
            let pageSize = this.state.pageSize;

            $.each(this.pageValue, function (index, element) {
                tableTD = [];

                if (Util.parseBool(config.DEFAULT_DATATABLE_IS_INDEX)) {
                    //element.dataIndex = index;
                    element.dataIndex = (pageIndex - 1) * pageSize + index;
                }

                // handler page index
                if (Util.parseBool(_self.props.indexable)) {
                    //tableTD.push(<td>{index + 1}</td>);
                    tableTD.push(<td>{(pageIndex - 1) * pageSize + index + 1}</td>);
                }

                // handler single and multiple select
                if (_self.props.selectionMode == "single") {
                    let value = (selectState != null && selectState != undefined && $.inArray(index, selectState) != -1) ? 1 : 0;
                    tableTD.push(<td><SelectionMode id={_self.componentId + "_single" + index}
                        name={_self.componentId + "_single"} value={value}
                        selectionMode="single" enabled={_self.props.enabled} /></td>);
                } else if (_self.props.selectionMode == "multiple") {
                    let value = (selectState != null && selectState != undefined && $.inArray(index, selectState) != -1) ? 1 : 0;
                    tableTD.push(<td><SelectionMode id={_self.componentId + "_multiple" + index}
                        name={_self.componentId + "_multiple"} value={value}
                        selectionMode="multiple" enabled={_self.props.enabled} /></td>);
                }



                React.Children.forEach(_self.props.children, function (child) {
                    let value = _self.getColumnValue(element, child.props.value);
                    value = (value == null || value == undefined) ? "" : value;

                    //if(value != undefined && React.Children.count(child.props.children) == 0){
                    //	tableTD.push(<td>{value}</td>);
                    //}

                    if (React.isValidElement(child.props.children)) {
                        let cloneChildren = null;
                        if (child.props.children.props.io == "in") {

                            cloneChildren = React.cloneElement(child.props.children, {
                                id: child.props.children.props.id + "_" + index,
                                model: element,
                                property: child.props.value,
                                value: (_self.props.var != undefined) ? "#{" + _self.props.var + "[" + index + "]." + child.props.value + "}" : value
                            });
                        } else {
                            cloneChildren = React.cloneElement(child.props.children, {
                                value: value
                            });
                        }

                        tableTD.push(<td className="tddefault">{cloneChildren}</td>);
                    } else if (child.props.selectionMode == "single") {
                        //tableTD.push(<td><input type="radio" name={_self.props.id + "_single"} checked={(1 == value || "1" == value) ? "checked" : null} /></td>);
                        value = (selectState != null && selectState != undefined && $.inArray(index, selectState) != -1) ? 1 : value;
                        tableTD.push(<td><SelectionMode id={_self.componentId + "_single" + index}
                            name={_self.componentId + "_single"} value={value}
                            selectionMode="single" enabled={child.props.enabled} /></td>);
                    } else if (child.props.selectionMode == "multiple") {
                        //tableTD.push(<td><input type="checkbox" name={_self.props.id + "_multiple"} checked={(1 == value || "1" == value) ? "checked" : null} /></td>);
                        value = (selectState != null && selectState != undefined && $.inArray(index, selectState) != -1) ? 1 : value;

                        tableTD.push(<td><SelectionMode id={_self.componentId + "_multiple" + index}
                            name={_self.componentId + "_multiple"} value={value}
                            selectionMode="multiple" enabled={child.props.enabled} /></td>);
                    } else if (child.props.render != undefined) {
                        let render = child.props.render;
                        if (typeof render == "function") {
                            tableTD.push(<td className="tddefault">{render(element)}</td>);
                        } else {
                            tableTD.push(<td className="tddefault">==None==</td>);
                        }
                    } else {
                        tableTD.push(<td className="tddefault">{String(value)}</td>);
                    }
                });

                if (_self.props.highlight) {
                    const _index = $.inArray(index, _self.props.highlight);
                    if (_index >= 0) {
                        tableBodyArray.push(<tr onDoubleClick={_self.onDoubleClick.bind(_self, JSON.stringify(element), index)}
                            onClick={_self.onClick.bind(_self, JSON.stringify(element), index)} className="highlight" id={_self.props.id + "_tr_" + index} value={JSON.stringify(element)}
                            data-value={JSON.stringify(element)}>{tableTD}</tr>);
                    } else {
                        tableBodyArray.push(<tr onDoubleClick={_self.onDoubleClick.bind(_self, JSON.stringify(element), index)}
                            onClick={_self.onClick.bind(_self, JSON.stringify(element), index)} id={_self.componentId + "_tr_" + index} value={JSON.stringify(element)}
                            data-value={JSON.stringify(element)}>{tableTD}</tr>);
                    }
                } else {
                    tableBodyArray.push(<tr onDoubleClick={_self.onDoubleClick.bind(_self, JSON.stringify(element), index)}
                        onClick={_self.onClick.bind(_self, JSON.stringify(element), index)} id={_self.componentId + "_tr_" + index} value={JSON.stringify(element)}
                        data-value={JSON.stringify(element)}>{tableTD}</tr>);
                }

                // handler row detail
                if (_self.props.rowDetailRender) {
                    if (_self.props.detailSecquence) {
                        tableTD.splice(Number(_self.props.detailSecquence), 0, <td className="details-control" />);
                    } else {
                        tableTD.push(<td className="details-control" />);
                    }
                    let colspan = tableTD.length;//$(tr).find("td").size();
                    tableBodyArray.push(<tr style={{ width: '100%', display: 'none' }} className='ui-datatable-detail'><td colSpan={colspan}>{_self.getRowDetail(element)}</td></tr>);
                }
            });
        }

        if (tableBodyArray.length == 0) {
            tableBodyArray.push(<tr id={"no-result" + this.componentId} className="table-no-result"></tr>);
            this.showPagination = false;
        }

        if (Util.parseBool(this.props.showBlankRow)) {
            if (this.pageCount == this.state.currentPageIndex) {
                let tableLength = tableBodyArray.length;
                let pagesize = this.state.pageSize;
                if (this.props.rowDetailRender) {
                    pagesize = pagesize * 2;
                }
                const trSize = pagesize - tableLength;
                if (trSize > 0) {
                    for (let i = 0; i < trSize; i++) {
                        tableBodyArray.push(<tr style={{ height: '31px' }}>{this.renderBlankTd()}</tr>);
                    }
                }
            }
        }

        return tableBodyArray;
    }



    componentDidMount() {
        super.componentDidMount();
        if (/rainbow-ui-\d+/g.test(this.componentId)) {
            console.warn("Please define id for UIDataTable component!");
        }

        let _self = this;
        this.initEvent();
        this.initDetailEvent();

        if (Util.parseBool(this.props.detailable) && this.props.detailVisible) {
            $("#" + this.props.id + " tbody tr td.details-control").each(function (index, data) {
                if (Util.isArray(_self.props.detailVisible)) {
                    if (_self.props.detailVisible.indexOf(index + 1) >= 0) {
                        $(data).click();
                    }
                } else {
                    if (Util.isString(_self.props.detailVisible) && _self.props.detailVisible.toLowerCase() == "all") {
                        $(data).click();
                    } else if (index + 1 == Number(_self.props.detailVisible)) {
                        $(data).click();
                    }
                }
            });
        }

        if (!this.showPagination) {
            $("#pagination" + this.componentId).hide();
        } else {
            $("#pagination" + this.componentId).show();
        }

        ComponentContext.put(this.componentId, this);
    }

    renderBlankTd() {
        const tdArray = [];
        for (let i = 0; i < this.props.children.length; i++) {
            tdArray.push(<td></td>);
        }
        return tdArray;
    }

    componentWillUpdate() {
        if (/rainbow-ui-\d+/g.test(this.componentId)) {
            console.warn("Please define id for UIDataTable component!");
        }
    }

    componentDidUpdate() {
        let _self = this;
        this.initEvent();
        this.initDetailEvent();
        this.isClick = true;
        if (Util.parseBool(_self.props.detailable)) {
            $("#" + _self.componentId + " tbody tr.ui-datatable-detail").each(function (index, data) {
                if ($(this).css("display") != "none") {
                    _self.isClick = false;
                    $(this).prev().find(".details-control").click();
                }
            });
        }

        if (Util.parseBool(_self.props.detailable) && _self.props.detailVisible) {
            $("#" + _self.componentId + " tbody tr td.details-control").each(function (index, data) {
                if (Util.isArray(_self.props.detailVisible)) {
                    if (_self.props.detailVisible.indexOf(index + 1) >= 0) {
                        $(data).click();
                    }
                } else {
                    if (Util.isString(_self.props.detailVisible) && _self.props.detailVisible.toLowerCase() == "all") {
                        $(data).click();
                    } else if (index + 1 == Number(_self.props.detailVisible)) {
                        $(data).click();
                    }
                }
            });
        }
        
        if (!Util.parseBool($('#' + this.componentId)[0].childNodes[1].childNodes.length > 0)) {
            $("#pagination" + this.componentId).hide();
        } else {
            $("#pagination" + this.componentId).show();
        }

    }

    /**@ignore
     * Init event
     */
    initEvent() {
        let _self = this;

        // Clear single & multiple change event
        $("input:radio[name=" + this.componentId + "_single" + "]").unbind("change");
        $("input:checkbox[name=" + this.componentId + "_multiple" + "]").unbind("change");
        $("input:checkbox[name=" + this.componentId + "_multiple_selectall" + "]").unbind("change").attr("checked", null);
        this.setMultipleSelectAll();

        // handler single select event
        $("input:radio[name=" + this.componentId + "_single" + "]").change((event) => {
            _self.onSingleChange(event);
        });

        // handler multiple select event
        $("input:checkbox[name=" + this.componentId + "_multiple" + "]").change((event) => {
            _self.onMultipleChange(event);
        });

        // handler multiple select all event
        $("input:checkbox[name=" + this.componentId + "_multiple_selectall" + "]").change((event) => {
            _self.onSelectAll(event);
        });
    }

    /**@ignore
     * Init detail event
     */
    initDetailEvent() {

        let _self = this, detailRows = [];
        const { detailDisVisible, rowDetailRender } = this.props;

        if (rowDetailRender) {
            const tableDetail = $("#" + this.componentId + " tbody").find("tr td.details-control");
            tableDetail.unbind();
            tableDetail.bind("click", function () {               
                let tr = $(this).closest("tr");
                let trIndex = parseInt(tr.attr('id').substr(tr.attr('id').length - 1, 1)) + 1 + "";
                if (detailDisVisible && detailDisVisible.toString().indexOf(trIndex) >= 0) {
                    return;
                }
                const element = JSON.parse(tr.attr("data-value"));
                tr.toggleClass("details");
                tr.next().toggle();
                if (_self.props.rowDetailCallBack && _self.isClick) {
                    _self.props.rowDetailCallBack(tr.next().is(':hidden'), element);
                }
            });
        }
    }

    /**@ignore
     * Clear table all tr detail
     */
    clearDetail() {

        $("#" + this.componentId + " tbody").find("tr").removeClass("details");
        $("#" + this.componentId + " tbody").find("tr.ui-datatable-detail").remove();
    }

    getRowDetail(element) {
        let { rowDetailRender } = this.props;
        if (typeof rowDetailRender == "function") {
            return rowDetailRender(element);
        }
    }

    /**@ignore
     * On select all
     */
    onSelectAll(event) {
        $("input:checkbox[name=" + this.componentId + "_multiple" + "]").each(function (index, element) {
            element.checked = event.target.checked ? "checked" : null;
        });

        if (this.props.onSelectAll != undefined) {
            this.props.onSelectAll(new OnRowSelectEvent(this, event, null, null));
        }
    }

    /**@ignore
     * On single change
     */
    onSingleChange(event) {
        this.onRowSelect(event);
    }

    /**@ignore
     * On multiple change
     */
    onMultipleChange(event) {
        this.setMultipleSelectAll();

        this.onRowSelect(event);
    }

    /**@ignore
     * Set multiple select all checkbox
     */
    setMultipleSelectAll() {
        let selectAllFlag = "checked";

        let multiple = $("input:checkbox[name=" + this.componentId + "_multiple" + "]");
        if (multiple && multiple.length > 0) {
            multiple.each(function (index, element) {
                if (!element.checked) {
                    selectAllFlag = null;
                }
            });
        } else {
            selectAllFlag = null;
        }

        $("input:checkbox[name=" + this.componentId + "_multiple_selectall" + "]").each(function (index, element) {
            element.checked = selectAllFlag;
        });
    }

    /**@ignore
     * On row select
     */
    onRowSelect(event) {
        if (this.props.onRowSelect != undefined) {
            let tableRow = $(event.target).closest("tr");
            this.props.onRowSelect(new OnRowSelectEvent(this, event, null, JSON.parse($(tableRow).attr("data-value"))));
        }
    }

    /**@ignore
     * On sort
     */
    onSort(event) {
        let sortWay = this.state.sortWay == "asc" ? "desc" : "asc";
        let sortCol = $(event.target).attr("data-value")
        this.setState({ sortColumn: sortCol, sortWay: sortWay });
        this.updateStatus = "Sort";

        if (this.props.onSort) {
            this.props.onSort(event, sortCol, sortWay)
        }
    }

    handleClick = () => {
        this.setState({
            dispaly: !dispaly
        })
    }

    /**@ignore
     * onClick
     */
    onClick(value, index) {
        clearTimeout(this.timer);
        if (this.props.onClick) {
            this.changeHighLight(index);
            this.timer = setTimeout(() => {
                this.props.onClick(value, index);
            }, 200)
        }
    }

    /**@ignore
     *onDoubleClick
     */
    onDoubleClick(value, index) {
        clearTimeout(this.timer);
        if (this.props.onDoubleClick) {
            this.changeHighLight(index);
            this.props.onDoubleClick(value, index);
        }
    }

    /**@ignore
     *changeHighLight
     */
    changeHighLight(index) {
        const len = $('#' + this.componentId + ' tr[id*=' + this.componentId + '_tr_]').length;
        for (let i = 0; i < len; i++) {
            $($('#' + this.componentId + ' tr[id*=' + this.componentId + '_tr_]')[i]).removeClass('highlight');
        }
        $($('#' + this.componentId + ' tr[id*=' + this.componentId + '_tr_]')[index]).addClass('highlight');
    }
};


/**@ignore
 * DataTable component prop types
 */
DataTable.propTypes = $.extend(Data.propTypes, {
    className: PropTypes.string,
    var: PropTypes.string,
    thBreakAll: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    tdBreakAll: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    // datatable event
    onRowSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onClick: PropTypes.func,
    onSort: PropTypes.func,
    onDoubleClick: PropTypes.func,
    detailVisible: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    highlight: PropTypes.array,
    detailSecquence: PropTypes.string,
    rowDetailCallBack: PropTypes.func,
    renderTableHeader: PropTypes.func,
    showBlankRow: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isColumnCustomDisp: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    fixedColumns: PropTypes.string.isRequired,
    showPaginationNum: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    showGoToPage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
});

/**@ignore
 * Get DataTable component default props
 */
DataTable.defaultProps = $.extend(Data.defaultProps, {
    className: null,
    thBreakAll: "false",
    tdBreakAll: "false",
    detailVisible: 0,
    indexable: "false",
    showBlankRow: "false",
    isCustomColumn: false,
    fixedColumns: "1",
    onClick: null,
    onDoubleClick: null,
    onSort: null,
    showPaginationNum: true,
    showGoToPage: false
});
