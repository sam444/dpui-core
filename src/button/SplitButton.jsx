import PropTypes from 'prop-types';

export default class SplitButton extends React.Component {
    render() {
         const {styleClass, children} = this.props;
        if (styleClass) {
            return (
                <div className="btn-group">
                    {
                        React.Children.map(children, (item) => {
                            if (item.props.styleClass) {
                                return item;
                            } 

                            return React.cloneElement(item, {
                                styleClass: styleClass
                            })
                        })
                    }
                </div>
            );
        }
    }
}

/**@ignore
 * Button component prop types
 */
SplitButton.propTypes = {
    styleClass: PropTypes.oneOf(["default", "primary", "success", "warning", "danger", "info"])
};

/**@ignore
 * Get Button component default props
 */
SplitButton.defaultProps = {
    styleClass: 'primary'
};