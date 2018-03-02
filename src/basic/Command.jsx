import Component from "./Component";
import Param from "./Param";
import Icon from "../display/Icon";
import OnClickEvent from '../event/OnClickEvent';
import {ComponentContext,ValidatorContext} from "rainbow-foundation-cache";
import PropTypes from 'prop-types';

export default class Command extends Component {

    constructor(props) {
        super(props);
    }

    getSize() {
        if (this.props.size != null && this.props.size != undefined) {
            return "btn-" + this.props.size;
        }
        return "";
    }

 
    renderIcon() {
        if (this.props.icon != null && this.props.icon != undefined) {
            if (this.props.value != null && this.props.value != undefined) {
                return (<Icon {...this.props}/>);
            }
            return (<Icon {...this.props}/>);
        }
        return "";
    }

    renderImage(){
        const {imageSrc} = this.props;
        return (
            imageSrc ?
                <img class="img-responsive" width="auto" height="100%" src={imageSrc} /> :
                <noscript/>
        );
    }

    onClick(event) {
        event.preventDefault();
        if (this.getDisabled() == "disabled") {
            return;
        }

        if (!ValidatorContext.validate(this.props.causeValidation, this.props.validationGroup, this.props.exceptValidationGroup)) {
            return;
        }

        // handler onClick
        let clickEvent = new OnClickEvent(this, event, Param.getParameter(this));
        if (this.props.onClick) {
            this.props.onClick(new OnClickEvent(this, event, Param.getParameter(this)));
        }

        // handler onComplete
        if (this.props.onComplete != undefined) {
            eval(this.props.onComplete);
        }

        // handler update
        if (this.props.update != undefined) {
            ComponentContext.forceUpdate(this.props.update);
        }
    }

    componentDidMount() {
        ComponentContext.put(this.props.id, this);
    }

};


Command.propTypes = $.extend({}, Component.propTypes, {
    //id: PropTypes.string,
    //value: PropTypes.string,
    //style: PropTypes.string,
    //styleClass: PropTypes.oneOf(["default", "primary", "success", "warning", "danger", "info"]),
    icon: PropTypes.string,
    imageSrc: PropTypes.string, 
    size: PropTypes.oneOf(["lg", "sm", "xs", "block"]),
    //disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    visibled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

    //onClick: PropTypes.func
});

/**
 * @ignore
 * Get Command component default props
 */
Command.defaultProps = $.extend({}, Component.defaultProps, {
    //disabled: null,
    //styleClass: config.DEFAULT_STYLE_CLASS,
    size: null,
    visibled: true
});
