import PropTypes from 'prop-types';

export default class Form extends React.Component {

    render() {
        return (
            <form id={this.props.id} className="form-horizontal validation-form" role="form">
                {this.props.children}
            </form>
        );
    }

    componentDidMount() {
        // Init keydown event
        $("#" + this.props.id).keydown((event) => {
            if (event.target.type != "textarea" && event.keyCode == 13) {
                return false;
            }
        });
    }

};


/**@ignore
 * Form component prop types
 */
Form.propTypes = {
    id: PropTypes.string.isRequired
};

/**@ignore
 * Get dynamicSection component default props
 */
Form.defaultProps = {};
