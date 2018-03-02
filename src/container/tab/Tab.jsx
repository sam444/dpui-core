import {Util, ELUtil} from 'rainbow-foundation-tools';
import {ValidatorContext} from "rainbow-foundation-cache";
import Component from "../../basic/Component";
import Param from "../../basic/Param";
import OnTabChangeEvent from '../../event/OnTabChangeEvent';
import PropTypes from 'prop-types';

export default class Tab extends Component {

    constructor(props) {
        super(props);
        if (Util.parseBool(props.lazyLoad)) {
            this.state = {activeIndex: props.activeIndex};
        } else {
            this.state = {};
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps&&nextProps.activeIndex){
            this.setState({activeIndex:nextProps.activeIndex});
        }
    }

     static getActiveIndex(tabId) {
         let activeIndex = 0;
         $("#" + tabId).find(".nav-item").map(function (index, element) {
            if ($(element).children().eq(0).hasClass("active")) {
                activeIndex =  index+1;
            }
        });
        return activeIndex;
    }
    
    render() {
        let navClassName = " nav nav-" + this.props.type + " "+ this.props.className;
        return (
            <div style={this.props.style}>
                <ul id={this.componentId} className={navClassName}>
                    {this.renderTab()}
                </ul>

                <div id={this.componentId + "_content"} className="tab-content">
                    {this.renderTabContent()}
                </div>
            </div>
        );
    }

    /**@ignore
     * Render tab
     */
    renderTab() {
        return React.Children.map(this.props.children, (child, index) => {
            let tabItemContentId = "#" + this.getTabItemContentId(index);
            let activeIndex = this.state.activeIndex || this.props.activeIndex;
            let disabled = child.props.disabled;
            if (Util.parseBool(disabled)) {
                return (
                    <li className="disabled">
                        <a href="javascript:void(0);" style={child.props.style}>
                            {this.renderTabTitle(child)}
                        </a>
                    </li>
                );
            }
            // if children is "TabItem"
            if (child.props.componentType == "TabItem") {
                if (activeIndex == index + 1) {
                    return (
                        <li className="nav-item">
                            <a className="nav-link active" href={tabItemContentId} style={child.props.style}
                               onClick={this.onClickTabItem.bind(child, this)}>
                                {this.renderTabTitle(child)}
                            </a>
                        </li>
                    );
                }

                return (
                    <li className="nav-item">
                        <a className="nav-link" href={tabItemContentId} style={child.props.style}
                           onClick={this.onClickTabItem.bind(child, this)}>
                            {this.renderTabTitle(child)}
                        </a>
                    </li>
                );
            } else if (child.props.componentType == "TabItemList") {
                return (
                    <li className="nav-item dropdown">
                        <a id={this.componentId + "_dropdown"} href={tabItemContentId} className="nav-link dropdown-toggle"
                           data-toggle="dropdown" style={child.props.style}>
                            {this.renderTabTitle(child)}
                            <b className="caret"/>
                        </a>
                        <ul className="dropdown-menu" role="menu" aria-labelledby={this.componentId + "_dropdown"}>
                            {this.renderTabItemList(child, index)}
                        </ul>
                    </li>
                );
            }
        });
    }

    /**@ignore
     * Render tab item list
     */
    renderTabItemList(children, index) {
        return React.Children.map(children.props.children, (child, subIndex) => {
            if (child.props.componentType == "TabItem") {
                let tabItemListContentId = "#" + this.getTabItemListContentId(index, subIndex);
                let activeIndex = this.state.activeIndex || this.props.activeIndex;

                if (activeIndex == (index + subIndex + 2)) {
                    return (
                        <a href={tabItemListContentId} style={child.props.style}
                           onClick={this.onClickTabItem.bind(child, this)}>
                            {this.renderTabTitle(child)}
                        </a>
                    );
                }

                return (
                    <li>
                        <a href={tabItemListContentId} style={child.props.style}
                           onClick={this.onClickTabItem.bind(child, this)}>
                            {this.renderTabTitle(child)}
                        </a>
                    </li>
                );
            }
        });
    }

    /**@ignore
     * Render tab content
     */
    renderTabContent() {
        return React.Children.map(this.props.children, (child, index) => {
            // if children is "TabItem"
            if (child.props.componentType == "TabItem") {
                let tabItemContentId = this.getTabItemContentId(index);
                let activeIndex = this.state.activeIndex || this.props.activeIndex;

                if (activeIndex == index + 1) {
                    return (
                        <div className="tab-pane fade active show" id={tabItemContentId}>
                            <p>{child.props.children}</p>
                        </div>
                    );
                }
                if (!Util.parseBool(this.props.lazyLoad)) {
                    return (
                        <div className="tab-pane fade" id={tabItemContentId}>
                            <p>{child.props.children}</p>
                        </div>
                    );
                }
                return <noscript/>;
            }

            // if children is "TabItemList"
            else if (child.props.componentType == "TabItemList") {
                return this.renderTabItemListContent(child, index);
            }
        });
    }

    /**@ignore
     * Render tab item list content
     */
    renderTabItemListContent(children, index) {
        return React.Children.map(children.props.children, (child, subIndex) => {
            if (child.props.componentType == "TabItem") {
                let tabItemListContentId = this.getTabItemListContentId(index, subIndex);
                let activeIndex = this.state.activeIndex || this.props.activeIndex;

                if (activeIndex == (index + subIndex + 2)) {
                    return (
                        <div className="tab-pane fade in active" id={tabItemListContentId}>
                            <p>{child.props.children}</p>
                        </div>
                    );
                }
                if (!Util.parseBool(this.props.lazyLoad)) {
                    return (
                        <div className="tab-pane fade" id={tabItemListContentId}>
                            <p>{child.props.children}</p>
                        </div>
                    );
                }
                return <noscript/>;
            }
        });
    }

    componentDidMount() {
        this.onTabChangeEvent = {newActiveIndex: null, oldActiveIndex: this.getInitIndex()};
    }

    /**@ignore
     * Render tab title
     */
    renderTabTitle(child) {
        let titleArray = [];

        if (child.props.icon) {
            titleArray.push(<span data-toggle="tooltip" data-placement="top" title={this.getI18n(child.props.helpText)} className={child.props.icon} style={{padding: "0px 5px 0px 5px"}}/>);
        }
        if (child.props.title) {
            titleArray.push(this.getI18n(child.props.title));
        }
        if (child.props.badge) {
            titleArray.push(<span className="badge badge-pill badge-primary" style={{marginLeft:"10px"}}>{child.props.badge}</span>);
        }

        return titleArray;
    }

    onClickTabItem(_self, event) {
        event.preventDefault();

        // handler before tab change event
        if (_self.props.onBeforeTabChange) {
            if (!_self.props.onBeforeTabChange(new OnTabChangeEvent(_self, this, event, Param.getAttributeParameter(this), null, null))) {
                return;
            }
        }

        // get tabitem index
        let target = $(event.target).parent("a").attr("href") == undefined ? $(event.target) : $(event.target).parent("a");
        let hrefArray = target.attr("href").split("__");
        let tabItemIndex = hrefArray[1];
        if (hrefArray.length == 3) {
            tabItemIndex = parseInt(tabItemIndex) + parseInt(hrefArray[2]);
        }

        // handler tab change event
        let tabChangeEvent = new OnTabChangeEvent(_self, this, event, Param.getAttributeParameter(this), tabItemIndex, _self.onTabChangeEvent.newActiveIndex);
        if (_self.props.onTabChange) {
            _self.props.onTabChange(tabChangeEvent);
        }

        // handler after tab change event
        if (_self.props.onAfterTabChange) {
            _self.props.onAfterTabChange(new OnTabChangeEvent(_self, this, event, Param.getAttributeParameter(this), null, null));
        }

        // set onTabChangeEvent property
        _self.onTabChangeEvent = {newActiveIndex: tabItemIndex, oldActiveIndex: _self.onTabChangeEvent.newActiveIndex};

        // show click tabitem
        if (Util.parseBool(_self.props.lazyLoad)) {
            _self.setState({activeIndex: tabItemIndex});
        } else {
            target.tab("show");
        }
    }

    getInitIndex() {
        return this.props.activeIndex == null ? 1 : this.props.activeIndex;
    }

    /**@ignore
     * Get tab item content id
     * @param index
     */
    getTabItemContentId(index) {
        return this.componentId + "__" + (index + 1);
    }

    /**@ignore
     * Get tab item list content id
     * @param index
     * @param subIndex
     */
    getTabItemListContentId(index, subIndex) {
        return this.componentId + "__" + (index + 1) + "__" + (subIndex + 1);
    }

};

/**@ignore
 * Tab component prop types
 */
Tab.propTypes = {
    type: PropTypes.oneOf(["tabs", "pills"]),
    activeIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    lazyLoad: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    style: PropTypes.object,
    onTabChange: PropTypes.func,
    onBeforeTabChange: PropTypes.func,
    onAfterTabChange: PropTypes.func,
    className: PropTypes.string
};

/**@ignore
 * Get tab component default props
 */
Tab.defaultProps = {
    type: "tabs",
    style: {},
    activeIndex: 1,
    lazyLoad: true,
    className: ''
};
