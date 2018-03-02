import Component from '../../basic/Component';
import PropTypes from 'prop-types';

export default class CardGroup extends Component {
    renderComponent() {
        let gap = parseInt(this.props.gap);
        let {children} = this.props;

        return (
            <div id={this.props.id} className={"row card-container "+this.props.className} style={{paddingTop: gap}}>
                {
                    React.Children.map(children, (item) => {
                        let occupied = 12;
                        if (this.props.column) {
                            occupied = parseInt(12 / parseInt(this.props.column));
                        } else if (item.props.width) {
                            occupied = item.props.width;
                        } else if(item.props.node) {
                            if (item.props.node.PropertyMap && item.props.node.PropertyMap.width) {
                                occupied = item.props.node.PropertyMap.width;
                            }
                        }

                        return (
                            <div className={"col-md-" + occupied} style={{marginBottom: gap}}>
                                {item}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

/**@ignore
 * CardGroup component prop types
 */
CardGroup.propTypes = $.extend({}, Component.propTypes, {
    column: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    gap: PropTypes.oneOf([PropTypes.string, PropTypes.number])
});

/**@ignore
 * Get dynamicSection component default props
 */
CardGroup.defaultProps = $.extend({}, Component.defaultProps, {
    gap: 15
});