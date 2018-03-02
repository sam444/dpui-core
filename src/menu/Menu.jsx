import Component from "../basic/Component";
import { Util } from 'rainbow-foundation-tools';
import Param from "../basic/Param";
import OnClickEvent from '../event/OnClickEvent';
import PropTypes from 'prop-types';

export default class Menu extends Component {
    render() {
        let className = "navbar-nav menu "+ this.props.className
        return (
            <ul id={this.componentId} className={className} style={this.props.style}>
                {this.renderMenuBar(this)}
            </ul>
        );
    }

    /**@ignore
     * Render menubar
     */
    renderMenuBar(component) {
        if (component.props.children != null) {
            let _self = this;
            if (React.Children.count(component.props.children) == 1) {
                if ($.isArray(component.props.children) && component.props.children.length == 1) {
                    return this.renderMenuBarChildren(component.props.children[0]);
                } else {
                    return this.renderMenuBarChildren(component.props.children);
                }
            } else {
                return component.props.children.map(function (child, index) {
                    return _self.renderMenuBarChildren(child, index);
                });
            }
        }
    }

    /**@ignore
     * Render menubar children
     */
    renderMenuBarChildren(component, index) {
        let _self = this;

        if (component.props.visibled != undefined && !Util.parseBool(this.getProperty("visibled", component))) {
            return <noscript />;
        } else if (component.props.componentType == "MenuItem") {
            return component;
        } else if (component.props.componentType == "Separator") {
            return component;
        } else if (component.props.componentType == "SubMenu") {
            if (!Util.parseBool(component.props.visibled)) {
                return <noscript />;
            }
            return (
                <li className={"nav-item " + component.props.active + (component.props.fakeMenuItem == 'true'?' fakeMenuItem':'')} onClick={this.onClickItem.bind(component)}>
                    <a className="nav-link dropdown-toggle" href="javascript: void(0);"
                        aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" >
                        {_self.getIcon(component)}
                        {!Util.parseBool(component.props.noI18n) ? this.getI18n(component.props.value) : component.props.value }
                    </a>
                    <ul className={"dropdown-menu " + component.props.className} style={{ display: 'none' }}>
                        {this.renderSubMenuBar(component)}
                    </ul>
                </li>
            )
        } else {
            return (
                <li>
                    {component}
                </li>
            )
        }
    }


    
    bindEvent() {
        const components = $(".navbar").find(".dropdown-menu"); 
        $.each(components, function (c) {
            const component = $(this);
            component.prev().unbind("mouseover");
            component.unbind("mouseover");
            component.unbind("mouseout");
            component.parent().bind("mouseout");
            component.prev().bind("mouseover", function () {
                component.show();
            });
            component.bind("mouseover", function () {
                component.show();
            })
            component.bind("mouseout", function () {
                component.hide();
            })
            component.parent().bind("mouseout", function () {
                component.hide();
            })
        })
    }

    componentDidUpdate() {
        this.bindEvent();
    }

    componentDidMount() {
        this.bindEvent();
    }

    renderSubMenuBar(component) {
        let _self = this;

        if (React.Children.count(component.props.children) == 1) {
            if ($.isArray(component.props.children) && component.props.children.length == 1) {
                return this.renderSubMenuBarChildren(component.props.children[0]);
            } else {
                return this.renderSubMenuBarChildren(component.props.children);
            }
        } else {
            return component.props.children.map(function (child, index) {
                return _self.renderSubMenuBarChildren(child);
            });
        }
    }

    onClickItem(event) {
        event.preventDefault();
        if (Util.parseBool(this.props["enabled"])) {
            return
        }
        if (this.props.onClick != undefined) {
            this.props.onClick(new OnClickEvent(this, event, Param.getParameter(this)));
        }
    }

    renderSubMenuBarChildren(components) {
        if ($.isArray(components)) {
            const returnMenu = [];
            components.forEach((component) => {
                returnMenu.push(this.buildComponent(component));
            });
            return returnMenu;
        } else {
            return this.buildComponent(components);
        }
    }

    buildComponent(component) {
        let _self = this;

        if (!component) {
            return (
                <li>
                </li>
            );
        } else if (component.props.visibled != undefined && !Util.parseBool(this.getProperty("visibled", component))) {
            return <noscript />;
        } else if (component.props.componentType == "MenuItem") {
            return (
                <li className={"dropdown-item" + (component.props.fakeMenuItem == 'true'?' fakeMenuItem':'')} {...component.props} onClick={_self.onClickItem.bind(component)}>
                    {!Util.parseBool(component.props.noI18n) ? this.getI18n(component.props.value) : component.props.value }
                </li>
            );
        } else if (component.props.componentType == "Separator") {
            return component;
        } else if (component.props.componentType == "SubMenu") {
            return (
                <li className="dropdown-submenu">
                    <a href="javascript: void (0);" className="dropdown-toggle" data-toggle="dropdown">
                    {!Util.parseBool(component.props.noI18n) ? this.getI18n(component.props.value) : component.props.value }
                    </a>
                    <ul className="dropdown-menu">
                        {this.renderSubMenuBar(component)}
                    </ul>
                </li>
            );
        }
    }

    getIcon(component) {
        if (component.props.icon != null && component.props.icon != '' && component.props.icon != undefined) {
            return (<span style={{ width: '20px', display: 'inline-block' }}><span className={component.props.icon} style={{ paddingRight: "5px" }} /></span>);
        }
        return <noscript />;
    }
}

/**@ignore
* MenuBar component prop types
*/
Menu.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string
};

/**@ignore
* Get MenuBar component default props
*/
Menu.defaultProps = {
    style: {},
    className: ''
};
