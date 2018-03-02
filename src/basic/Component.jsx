import config from "config";
import { PageContext } from "rainbow-foundation-cache";
import UniqueId from './UniqueId';
import { Util } from "rainbow-foundation-tools";
import PropTypes from 'prop-types';
import { CodeTableService } from "rainbow-foundation-codetable";

export default class Component extends React.Component {

    constructor(props) {
        super(props);
        //this.state = {};
    }

    render() {
        this.setProperty();

        if (Util.parseBool(this._visibled)) {
            return this.renderComponent();
        }
        return <noscript />;
    }

    renderComponent() {
        return <noscript />;
    }


    getProperty(propertyName, component) {
        let _self = component ? component : this;
        let property = _self.props[propertyName];

        if (Util.isFunction(property)) {
            return property(_self);
        }

        return property;
    }

    getId() {
        return this.componentId;
    }


    getRefProperty() {
        // for ref is the key word in react,use refName to define ref.
        if (this.props.refName) {
            return this.props.refName;
        } else {
            return this.getId();
        }
    }


    getComposedRefProperty() {
        let refProperty = this.getRefProperty();
        return refProperty + "_composed";
    }

    getName() {
        if (this.props.name) {
            return this.props.name;
        } else {
            return this.componentId;
        }
    }

    getNameForTest() {
        return this.componentName;
    }

    getDisabled() {
        if (Util.parseBool(this.getProperty("disabled")) || !Util.parseBool(this.getProperty("enabled"))) {
            return "disabled";
        }
        return null;
    }

    getReadOnly() {
        if (Util.parseBool(this.getProperty("readonly"))) {
            return "disabled";
        }
        return null;
    }

    getURL() {
        let url = this.getProperty("url")
        // if (url.indexOf("?") > -1) {
        //     url = url + "&" + sessionStorage.getItem("Authorization");
        // } else {
        //     url = url + "?" + sessionStorage.getItem("Authorization");
        // }

        return url;
    }

    setProperty() {
        this._disabled = this.getProperty("disabled");
        this._enabled = this.getProperty("enabled");
        this._visibled = this.getProperty("visibled");

    }

    countdown (){
        var end = new Date ();
        end.setFullYear(2018);
        end.setMonth(0);
        end.setDate(15);
        end.setHours(0);
        end.setMinutes(0);
        end.setSeconds(0);
        var now = new Date ();
         
        var m = Math.round ((end - now) / 1000);
        var day = parseInt (m / 24 / 3600);
        var hours = parseInt ((m % (3600 * 24)) / 3600);
        var minutes = parseInt ((m % 3600) / 60);
        var seconds = m % 60;
         
        if (m > 0)
        {
            return "距离废弃 codetabe Id 还剩" + day + "天" + hours + "小时" + minutes + "分钟" + seconds+ "秒";
        }
        
    }

    getI18n(code) {
        if (config.DOES_USE_I18N == undefined) {
            return code;
        } else if (config.DOES_USE_I18N) {
            if (Util.parseBool(this.getProperty("noI18n"))) {
                return code;
            } else {
                const value = i18n[code];
                if (!_.isEmpty(code)) {
                    if (_.isEmpty(value)) {
                        return config.DEFAULT_I18N_CONFIGURATION_GROUP + "." + code;

                    } else {
                        return value;
                    }
                }
            }
        } else {
            if (Util.parseBool(this.getProperty("noI18n"))) {
                return code;
            }else{
                return i18n[code];
            }
        }
    }

    componentWillMount() {
        this._componentWillMount();
    }

    _componentWillMount() {
        this.componentId = (this.props.id) ? this.props.id : UniqueId.generateId();

        this.componentName = "";
        if (this.props.id) {
            this.componentName = this.props.id;
        } else {
            const props = this.props;
            const arr = [props.label, props.value, props.valueLink, props.model, props.property];

            for (let i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    this.componentName += arr[i];
                }
            }
            this.componentName = this.componentName.replace(/[#\{\}\.\[\] ]/g, "_").replace(/_+/g, "_");
            if (this.componentName[this.componentName.length - 1] == "_") {
                this.componentName = this.componentName.substring(0, this.componentName.length - 1);
            }
        }

        //this.setProperty();
    }

    componentDidMount() {
        this._componentDidMount();
    }

    _componentDidMount() {
        UniqueId.addComponentId();
    }

    componentWillUpdate() {
        this._componentWillUpdate();
    }

    _componentWillUpdate() {
        //this.setProperty();
    }

    componentDidUpdate() {
        this._componentDidUpdate();
    }

    _componentDidUpdate() {

    }

    

}


/**  
 * @ignore
 * Component component prop types
 */
Component.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
    styleClass: PropTypes.oneOf(["default", "primary", "success", "warning", "danger", "info"]),
    className: PropTypes.string,
    enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func]),
    disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func]),
    visibled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

    onClick: PropTypes.func
};

/**
 * Get component component default props
 */
Component.defaultProps = {
    enabled: function () {
        const page_readOnly = PageContext.get("PAGE_READONLY");
        if (page_readOnly == null) {
            return true;
        } else {
            return !page_readOnly;
        }
    },
    disabled: false,
    visibled: true,
    style: {},
    styleClass: config.DEFAULT_STYLE_CLASS,

    onClick: () => { }
};

