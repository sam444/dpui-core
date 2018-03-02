import Component from "../basic/Component";
import PropTypes from 'prop-types';

export default class Column extends Component {

    render() {
        return this.props.value;
    }

};


/**@ignore
 * Column component prop types
 */
Column.propTypes = {
    value: PropTypes.string,
    width: PropTypes.string,
    align: PropTypes.string,
    selectionMode: PropTypes.oneOf(["single", "multiple"]),
    sortable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    sortValue: PropTypes.string,
    codeTableDataSource: PropTypes.array,
    noI18n: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    className: PropTypes.string
};

/**@ignore
 * Get Column component default props
 */
Column.defaultProps = {
    width: "auto",
    align: "left",
    codeTableDataSource: [],
    noI18n: false,
    className: ''
};
