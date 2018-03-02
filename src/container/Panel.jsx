import Component from "../basic/Component";
import Icon from "../display/Icon";
import OnToggleEvent from '../event/OnToggleEvent';
import config from "config";
import {Util,ELUtil} from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Panel extends Component {

    renderComponent() {

        if (ELUtil.parseBoolValue(this.props.onlyHead)) {
            return (
                <div className={"panel panel-" + this.props.styleClass} style={this.props.style}>
                    {this.renderPanelHeader()}
                </div>
            );
        } else {

            return (
                <div className={"panel panel-" + this.props.styleClass} style={this.props.style}>
                    {this.renderPanelHeader()}
                    {this.renderPanelBody()}
                    {this.renderPanelFooter()}
                </div>
            );
        }
    }

    /**@ignore
     * Render panel header
     */
    renderPanelHeader() {
        if (Util.parseBool(this.props.headerable)) {
            return (
                <div className="panel-heading">
					<span className="panel-title">
						{this.renderIcon()}
                        {this.renderToggle()}
                        {this.getProperty("panelTitle")}
                     </span>
                    {this.renderPanelRightHeader()}
                </div>
            );
        }
    }

    /**@ignore
     * Render panel right header
     */
    renderPanelRightHeader() {
        if (this.props.panelHeader != null && this.props.panelHeader != undefined) {
            return (
                <span style={{float: "right"}}>{this.props.panelHeader}</span>
            );
        }

        return <noscript/>;
    }

    /**@ignore
     * Render panel body
     */
    renderPanelBody() {
        const body = "panel-body panel-border";
        const noBody = "panel-body panel-noborder";
        if (Util.parseBool(this.props.toggleable)) {
            return (
                <div id={this.componentId  + "_collapse"}
                     className={"panel-body panel-border panel-collapse collapse " + this.getExpendStatus()}>
                    <div>{this.props.children}</div>
                </div>
            );
        } else {
            return (<div className={this.props.panelFooter != null?noBody:body}>{this.props.children}</div>);
        }
    }


    /**@ignore
     * Render Has icon in Panel Header Title
     */
    renderIcon() {
        if (this.props.icon != null && this.props.icon != undefined) {
            if (this.props.value != null && this.props.value != undefined) {
                return (<Icon {...this.props}/>);
            }
            return (<Icon {...this.props}/>);
        }
        return "";
    }


    /**@ignore
     * Render panel footer
     */
    renderPanelFooter() {
        if (this.props.panelFooter != null && this.props.panelFooter != undefined) {
            return (
                <div>
                    <div className="footerhr"></div>
                    <div className="panel-footer footerborder">{this.props.panelFooter}</div>
                </div>
            );
        }

        return <noscript/>;
    }

    /**@ignore
     * Render toggle link
     */
    renderToggle() {
        if (Util.parseBool(this.props.toggleable)) {
            return (
                <a data-toggle="collapse" data-parent="#accordion in" href={"#" + this.componentId + "_collapse"}
                   className={"fa piconstyle" + this.getExpendStyleClass()} onClick={this.onToggle.bind(this)}
                   style={{textDecoration: "none"}}/>
            );
        }
    }

    /**@ignore
     * Get expend status
     */
    getExpendStatus() {
        if (Util.parseBool(this.props.expendOnPageLoad)) {
            return "in";
        } else {
            return "";
        }
    }

    /**@ignore
     * Get expend style class
     */
    getExpendStyleClass() {
        if (Util.parseBool(this.props.expendOnPageLoad)) {
            return Panel.EXPEND_STATUS;
        } else {
            return Panel.COLLAPSE_STATUS;
        }
    }

    /**@ignore
     * On toggle event
     */
    onToggle(event) {
        // get expend flag
        this.expendFlag = this.expendFlag != undefined ? this.expendFlag : Util.parseBool(this.props.expendOnPageLoad);

        if (this.expendFlag) {
            $(event.target).removeClass(Panel.EXPEND_STATUS).addClass(Panel.COLLAPSE_STATUS);
        } else {
            $(event.target).removeClass(Panel.COLLAPSE_STATUS).addClass(Panel.EXPEND_STATUS);
        }

        // handler toggle event
        if (this.props.onToggle != undefined) {
            this.props.onToggle(new OnToggleEvent(this, this.expendFlag ? "collapse" : "expend"));
        }

        this.expendFlag = !this.expendFlag;
    }

};

Panel.COLLAPSE_STATUS = "fa fa-angle-up";
Panel.EXPEND_STATUS = "fa fa-angle-down";

/**@ignore
 * Panel component prop types
 */
Panel.propTypes = $.extend({}, Component.propTypes, {
    panelTitle: PropTypes.string,
    onlyHead: PropTypes.string,

    panelHeader: PropTypes.object,
    panelFooter: PropTypes.object,

    headerable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    toggleable: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    expendOnPageLoad: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    icon: PropTypes.string,

    onToggle: PropTypes.func
});

/**@ignore
 * Get dynamicSection component default props
 */
Panel.defaultProps = $.extend({}, Component.defaultProps, {
    styleClass: config.DEFAULT_STYLE_CLASS,
    headerable: true,
    toggleable: false,
    expendOnPageLoad: true,
    onlyHead: "false"
});
