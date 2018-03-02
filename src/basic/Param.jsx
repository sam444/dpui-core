import PropTypes from 'prop-types';

export default class Param extends React.Component {

    static getParameter(component) {
        var children = component.props.children;
        var parameter = [];

        if (React.Children.count(children) == 0) {

        }
        else if (React.Children.count(children) == 1) {
            if ($.isArray(children) && children.length == 1) {
                children = children[0];
            }
            if (children.props && children.props.componentType == 'Param') {
                parameter.push({"name": children.props.name, "value": children.props.value});
            }
        }
        else {
            children.map(function (child, index) {
                if (child.props && child.props.componentType == 'Param') {
                    parameter.push({"name": child.props.name, "value": child.props.value});
                }
            });
        }

        return parameter;
    }

    /**@ignore
     * Get attribute parameter
     * param = {[<Param name="a" value="aaa" />, <Param name="b" value="bbb" />, <Param name="c" value="ccc" />]}
     */
    static getAttributeParameter(component) {
        var paramArray = component.props.param;
        var parameter = [];

        if (paramArray != undefined) {
            $.each(paramArray, function (index, element) {
                if (element.props.componentType == 'Param') {
                    parameter.push({"name": element.props.name, "value": element.props.value});
                }
            });
        }

        return parameter;
    }

    render() {
        return <noscript/>;
    }

};


/**@ignore
 * Param component prop types
 */
Param.propTypes = {
    name: PropTypes.string,
    value: PropTypes.object
};

/**@ignore
 * Get param component default props
 */
Param.defaultProps = {
    componentType: "Param"
};
