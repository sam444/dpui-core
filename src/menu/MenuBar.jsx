import Component from "../basic/Component";
import Param from "../basic/Param";
import OnClickEvent from '../event/OnClickEvent';
import {ELUtil} from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class MenuBar extends Component {
    renderUser() {
        return (
            <div className="navbar-form navbar-right">
                <div className="bar_right">
                    <div className="float_left usericon">
                        <i className="fa fa-user"></i>
                    </div>
                    <div className="float_left userinfo">
                        {this.props.userName}
                    </div>
                    <div className="float_right logouticon">
                        <a href="javascript: void(0);" onClick={this.logout.bind(this)}>
                            <i className="fa fa-power-off"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    renderBusinessUser() {
        return (
            <ul>
                <li className="dropdown" style={{float:'right',display:'block',margin:'16px'}}>
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <span className="fa fa-gear" style={{paddingRight: "5px"}}/><b className="caret"/>
                    </a>
                    {this.props.businessValue}
                </li>
            </ul>
        );
    }

    render() {
        let backgroundWeight = this.props.backgroundWeight ? 'navbar-' + this.props.backgroundWeight : null;
        let styleClass = this.props.styleClass ? 'bg-' + this.props.styleClass : null;
        let fixtop = ELUtil.parseBoolValue(this.props.fixtop) ? 'fixed-top': null;

        return (
            <nav className={"navbar navbar-toggleable-sm " + backgroundWeight + " " + styleClass + " " + fixtop}
                style={this.props.style}>
                {
                    this.props.logo ?
                        <a className="navbar-brand" href="javascript:void (0);" onClick={this.clickLogoHandler.bind(this)}>
                            {this.props.logo()}
                        </a> :
                        null
                }
                {
                    this.props.headerTitle ?
                        <a className="navbar-brand" href="javascript:void (0);" onClick={this.clickHeaderTitleHandler.bind(this)}>
                            {this.props.headerTitle}
                        </a> :
                        null
                }
                <div className="navbar-collapse" id={this.componentId}>
                    {this.props.children}
                </div>
                {
                    this.props.renderRight ?
                        this.props.renderRight() :
                        null
                }
                {ELUtil.parseBoolValue(this.props.showBusinessUser) ? this.renderBusinessUser() : null}
                {ELUtil.parseBoolValue(this.props.showUser) ? this.renderUser() : null}
            </nav>
        );
    }

    clickLogoHandler(event) {
        if (this.props.onLogoClick != undefined) {
            this.props.onLogoClick(new OnClickEvent(this, event, Param.getParameter(this)));
        }
    }

    clickHeaderTitleHandler(event) {
        if (this.props.onHeaderTitleClick != undefined) {
            this.props.onHeaderTitleClick(new OnClickEvent(this, event, Param.getParameter(this)));
        }
    }

    logout(event) {
        if (this.props.logout != undefined) {
            this.props.logout(new OnClickEvent(this, event, Param.getParameter(this)));
        }
    }
};


/**@ignore
 * MenuBar component prop types
 */
MenuBar.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    headerTitle: PropTypes.string,
    styleClass: PropTypes.string,
    logo: PropTypes.func,
    fixtop: PropTypes.string,
    businessValue: PropTypes.string,
    backgroundWeight: PropTypes.string,
    showUser: PropTypes.string,
    showBusinessUser: PropTypes.string,
    userName: PropTypes.string,
    userRole: PropTypes.string,
    renderRight: PropTypes.func,
    logout: PropTypes.func,
    onLogoClick: PropTypes.func,
    onHeaderTitleClick: PropTypes.func,
};

/**@ignore
 * Get MenuBar component default props
 */
MenuBar.defaultProps = {
    style: {},
    fixtop: 'true',
    showUser: "false",
    userName: "User",
    userRole: "Administrator"
};
