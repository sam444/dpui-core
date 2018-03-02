import PropTypes from 'prop-types';

export default class Separator extends React.Component {
	
	render(){
		return (
			<li role="presentation" className="dropdown-divider"/>
		)
	}
	
};

/**@ignore
 * Separator component prop types
 */
Separator.propTypes = {
	id: PropTypes.string
};

/**@ignore
 * Get separator component default props
 */
Separator.defaultProps = {
	componentType: "Separator"
};
