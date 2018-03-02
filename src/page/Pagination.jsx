import r18n from "../i18n/reactjs-tag.i18n";
import UINumber from "../input/Number";
import {Util} from "rainbow-foundation-tools";
import config from "config";
import PropTypes from 'prop-types';

export default class Pagination extends React.Component {

    /**@ignore
     * Get page count
     */
    static getPageCount(totalCount, pageSize) {
        if (totalCount == null || totalCount == undefined) {
            return 0;
        }

        if (totalCount % pageSize == 0) {
            return parseInt(totalCount / pageSize);
        }
        return parseInt(totalCount / pageSize) + 1;
    }

    /**@ignore
     * Get page no
     */
    static getPageNo(pageIndex, pageSize) {
        return (pageIndex - 1) / pageSize + 1;
    }

    render() {
        return (
            <ul id={"pagination"+this.props.id} className="pagination">
                {this.renderFirst()}
                {this.renderPrevious()}
                {this.renderNumber()}
                {this.renderNext()}
                {this.renderLast()}
                {this.renderPageInfo()}
                {this.renderGotoPage()}
            </ul>
        );
    }

    /**@ignore
     * Render page info
     */
    renderPageInfo() {
        if(Util.parseBool(this.props.showPaginationNum)){
            return (<li className="pagenumber" >{this.props.renderDropDownList}</li>);
        }else{
            return (<noscript/>);
        }
    }

    /**@ignore
     * Render number
     */
    renderNumber() {
        let currentPage = parseInt(this.props.currentPageIndex);
        let totalPage = parseInt(this.props.pageCount);
        let MAX_NUM = parseInt(this.props.maxNumber);

        let numberArray = [];
        if (totalPage < MAX_NUM) {
            for (let i = 1; i <= totalPage; i++) {
                numberArray.push(this.handlerNumber(i));
            }
        } else if (currentPage >= 1 && currentPage <= parseInt((MAX_NUM + 1) / 2)) {
            for (let i = 1; i <= MAX_NUM; i++) {
                numberArray.push(this.handlerNumber(i));
            }
        } else if (currentPage >= parseInt((MAX_NUM + 3) / 2) && currentPage <= (totalPage - parseInt((MAX_NUM + 2) / 2))) {
            for (let i = currentPage - parseInt((MAX_NUM - 1) / 2); i <= (currentPage + parseInt(MAX_NUM / 2)) && i <= totalPage; i++) {
                numberArray.push(this.handlerNumber(i));
            }
        } else if (currentPage >= (totalPage - parseInt(MAX_NUM / 2)) && (currentPage <= totalPage)) {
            for (let i = totalPage - MAX_NUM + 1; i > 0 && i <= totalPage; i++) {
                numberArray.push(this.handlerNumber(i));
            }
        }

        return numberArray;
    }

    /**@ignore
     * Render goto page
     */
    renderGotoPage() {
        if(Util.parseBool(this.props.showGoToPage)){
            return (<li className="goto-page"><UINumber label='' ref='gotoPage' widthAllocation="0,12" layout='horizontal' allowDecimal="false" className="paginationGotoPage" placeHolder={this.props.pageCount} minValue="1" maxValue={this.props.pageCount} minValueMessage="the number should be bigger than 0." maxValueMessage={"the number should be not bigger than " + this.props.pageCount} 
                    onKeyDown={this.handlerKeyDown.bind(this)} onBlur={this.onGoToNumber.bind(this)}></UINumber></li>);
        }else{
            return (<noscript/>);
        }
    }

    /**@ignore
     * Render first
     */
    renderFirst() {
        if (this.props.currentPageIndex <= 1) {
            return (<li className="disabled"><a href="javascript:void(0);">{Util.parseBool(config.DEFAULT_DATATABLE_PAGEABLE_EN)?r18n.FirstPage:"<<"}</a></li>);
        }

        return (<li><a href="javascript:void(0);" onClick={this.onToFirst.bind(this)}>{Util.parseBool(config.DEFAULT_DATATABLE_PAGEABLE_EN)?r18n.FirstPage:"<<"}</a></li>);
    }

    /**@ignore
     * Render previous
     */
    renderPrevious() {
        if (this.props.currentPageIndex <= 1) {
            return (<li className="disabled"><a href="javascript:void(0);">{Util.parseBool(config.DEFAULT_DATATABLE_PAGEABLE_EN)?r18n.PreviousPage:"<"}</a></li>);
        }

        return (<li><a href="javascript:void(0);" onClick={this.onToPrevious.bind(this)}>{Util.parseBool(config.DEFAULT_DATATABLE_PAGEABLE_EN)?r18n.PreviousPage:"<"}</a></li>);
    }

    /**@ignore
     * Render next
     */
    renderNext() {
        if (this.props.currentPageIndex == this.props.pageCount || this.props.pageCount <= 1) {
            return (<li className="disabled"><a href="javascript:void(0);">{Util.parseBool(config.DEFAULT_DATATABLE_PAGEABLE_EN)?r18n.NextPage:">"}</a></li>);
        }

        return (<li><a href="javascript:void(0);" onClick={this.onToNext.bind(this)}>{Util.parseBool(config.DEFAULT_DATATABLE_PAGEABLE_EN)?r18n.NextPage:">"}</a></li>);
    }

    /**@ignore
     * Render last
     */
    renderLast() {
        if (this.props.currentPageIndex == this.props.pageCount || this.props.pageCount <= 1) {
            return (<li className="disabled"><a href="javascript:void(0);">{Util.parseBool(config.DEFAULT_DATATABLE_PAGEABLE_EN)?r18n.LastPage:">>"}</a></li>);
        }

        return (<li><a href="javascript:void(0);" onClick={this.onToLast.bind(this)}>{Util.parseBool(config.DEFAULT_DATATABLE_PAGEABLE_EN)?r18n.LastPage:">>"}</a></li>);
    }

    onToFirst() {
        this.props.onToPage(1);
    }

    onToPrevious() {
        this.props.onToPage(parseInt(this.props.currentPageIndex) - 1);
    }

    onToNumber(event) {
        this.props.onToPage($(event.target).attr("data-number"));
    }

    onToNext() {
        this.props.onToPage(parseInt(this.props.currentPageIndex) + 1);
    }

    onToLast() {
        this.props.onToPage(parseInt(this.props.pageCount));
    }

    onGoToNumber(event) {
        let totalPage = parseInt(this.props.pageCount);
        let currentPage = parseInt(this.props.currentPageIndex);
        let pageNoValue = parseInt(event.jsEvent.target.value);
        if (pageNoValue > 0 && pageNoValue <= totalPage && pageNoValue != currentPage) {
            this.props.onToPage(pageNoValue);
        } else {
            let gotoPage = this.refs.gotoPage;
            gotoPage.value = this.props.currentPageIndex;
            event.jsEvent.target.value = currentPage;
            gotoPage.setState();
        }
    }

    handlerKeyDown(event) {
        if (event.jsEvent.keyCode == 13) {
            this.onGoToNumber(event);
        }
    }

    handlerNumber(index) {
        let active = this.getActiveStyleClass(index);
        return (
            <li className={active}>
                <a href="javascript:void(0);" onClick={(active == null) ? this.onToNumber.bind(this) : null} data-number={index}>
                    {index}
                </a>
            </li>
        );
    }

    getActiveStyleClass(pageIndex) {
        return (this.props.currentPageIndex == pageIndex) ? "active" : null;
    }

};


/**@ignore
 * Pagination component prop types
 */
Pagination.propTypes = {
    currentPageIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pageCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    renderDropDownList: PropTypes.func,
    pageIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onToPage: PropTypes.func.isRequired
};

/**@ignore
 * Get pagination component default props
 */
Pagination.defaultProps = {
    pageCount: 1,
    currentPageIndex: 1,
    maxNumber: 5
};