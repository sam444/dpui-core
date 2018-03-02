import Component from "../basic/Component";
import Param from "../basic/Param";
import {ComponentContext} from "rainbow-foundation-cache";
import OnEvent from '../event/OnEvent';
import PropTypes from 'prop-types';

export default class Event extends Component {

    static initEventListener(component) {
        let _self = this, {children} = component.props;

        if (React.Children.count(children) == 0) {

        }
        else if (React.Children.count(children) == 1) {
            if ($.isArray(children) && children.length == 1) {
                children = children[0];
            }
            if (children.props.componentType == "Event") {
                _self.doEventListener(component, children);
            }
        }
        else {
            children.map(function (child, index) {
                if (child.props.componentType == "Event") {
                    _self.doEventListener(component, child);
                }
            });
        }
    }

    /**@ignore
     * Init attribute event
     * event = {[<Event event="a" listener="..." />, <Event event="b" listener="..." />, <Event event="c" listener="..." />]}
     */
    static initAttributeEventListener(component) {
        let _self = this, eventArray = component.props.event;
        if (eventArray != undefined) {
            $.each(eventArray, function (index, element) {
                if (element.props.componentType == "Event") {
                    _self.doEventListener(component, element);
                }
            });
        }
    }

    static doEventListener(component, event) {
        let object = $("#" + component.componentId);
        object = object.length != 0 ? object : $("input[name=" + component.componentId + "]")

        object.bind(event.props.event, function (jsEvent) {
            let {listener, update} = event.props;
            if (listener) {
                listener(new OnEvent(event, jsEvent, Param.getParameter(event)));
            }

            if (update) {
                ComponentContext.forceUpdate(update);
            }
        });
    }

};


/**@ignore
 * Event component prop types
 */
Event.propTypes = {
    event: PropTypes.oneOf(["keyup", "change", "blur", "focus"]),
    update: PropTypes.string,
    listener: PropTypes.func,
};

/**@ignore
 * Get Event component default props
 */
Event.defaultProps = {
    componentType: "Event"
};
