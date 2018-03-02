import Component from "../basic/Component";
import PropTypes from 'prop-types';

export default class Icon extends Component {

    getSize() {
        let size = {
            "fa-lg": this.props.size === "lg",
            "fa-2x": this.props.size === "2x",
            "fa-3x": this.props.size === "3x",
            "fa-4x": this.props.size === "4x",
            "fa-5x": this.props.size === "5x",
            "fa-fw": this.props.fixWidth
        };

        if (this.props.css) {
            size[this.props.css] = true;
        }

        return size;
    }

    getIcon() {
        let c = {
            "fa": true,
            "fa-spin": this.props.spin,
            "fa-pulse": this.props.pulse,
            "fa-rotate-90": this.props.rotate == 90,
            "fa-rotate-180": this.props.rotate == 180,
            "fa-rotate-270": this.props.rotate == 270,
            "fa-flip-horizontal": this.props.flip === "horizontal",
            "fa-flip-vertical": this.props.flip === "vertical"
        };
        c["fa-" + this.props.icon] = true;

        if (this.props.iconClassName) {
            c[this.props.iconClassName] = true;
        }

        return c;
    }

    render() {
        let size = this.getSize();
        let iconClasses = this.getIcon();

        return <span className={this.props.icon} title={this.props.tooltip}/>;
    }

    setClass(classJson) {
        let classString = "";
        
        $.each(classJson, function (key, value) {
            if (value) {
                classString = classString + " " + key;
            }
        });

        return classString;
    }

};


/**@ignore
 * Icon component prop types
 */
Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.oneOf(["lg", "2x", "3x", "4x", "5x"]),
    fixWidth: PropTypes.bool,

    spin: PropTypes.bool,
    pulse: PropTypes.bool,
    rotate: PropTypes.oneOf([90, 180, 270]),
    flip: PropTypes.oneOf(["horizontal", "vertical"]),
    tooltip: PropTypes.string,

    css: PropTypes.string,
};

/**@ignore
 * Get icon component default props
 */
Icon.defaultProps = {
    fixWidth: true,
    spin: false
};
