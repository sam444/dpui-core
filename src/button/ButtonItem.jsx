import {Util} from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';
import Command from "../basic/Command";

export default class ButtonItem extends Command {
    render() {
        if (Util.parseBool(this.props.isDropDown)) {
            let tempClass = "btn btn-secondary dropdown-toggle split-btn";
            if (this.props.styleClass) {
                tempClass += " btn-" + this.props.styleClass;
            }
            
            return (
                <div className="btn-group" role="group">
                    <button type="button" className={tempClass} data-toggle="dropdown" onClick={this.props.onDropDownClick}>
                        {
                            (this.props.icon ?
                                <span className={this.props.icon} style={{paddingRight: '5px'}} /> :
                                null)
                        }{this.getI18n(this.props.value)}
                    </button>
                    <div className="dropdown-menu split-btn">
                        {this.renderItem()}
                    </div>
                </div>
            );
        } else {
            let tempClass = "btn btn-secondary split-btn";
            if (this.props.styleClass) {
                tempClass += " btn-" + this.props.styleClass;
            }

            if (this.props.onClick) {
                return (
                    <button type="button" className={tempClass} onClick={this.props.onClick}>
                        {
                            this.props.icon ?
                                <span className={this.props.icon} style={{paddingRight: '5px'}} /> :
                                null
                        }
                        {this.getI18n(this.props.value)}
                    </button>
                )
            } else {
                return (
                    <button type="button" className={tempClass}>
                        {
                            this.props.icon ?
                                <span className={this.props.icon} style={{paddingRight: '5px'}} /> :
                                null
                        }
                        {this.getI18n(this.props.value)}
                    </button>
                )
            }
        }
    }

    renderItem() {
        let children = this.props.children;
        if (children) {
            if(!$.isArray(children)){
                children = [children];
            }
            return children.map((item) => {
                if (item.props.onClick) {
                    return (
                        <a className="dropdown-item" href="javascript: void (0);" onClick={item.props.onClick}>{this.getI18n(item.props.value)}</a>
                    );
                } else {
                    return (
                        <a className="dropdown-item" href="javascript: void (0);">{this.getI18n(item.props.value)}</a>
                    );
                }
            });
        } else {
            return [];
        }
    }
}


/**@ignore
 * Button component prop types
 */
ButtonItem.propTypes = {
    isDropDown: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    styleClass: PropTypes.oneOf(["default", "primary", "success", "warning", "danger", "info"]),
    icon: PropTypes.string,
    onClick: PropTypes.func,
    onDropDownClick: PropTypes.func,
    items: PropTypes.func
};

/**@ignore
 * Get Button component default props
 */
ButtonItem.defaultProps = {
    isDropDown: false,
    onDropDownClick: ()=>{}
};