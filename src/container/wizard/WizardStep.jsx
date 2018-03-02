import PropTypes from 'prop-types';

export default class WizardStep extends React.Component {
	render(){
		return this.props.children;
	}
};

/**@ignore
 * WizardStep component prop types
 */
WizardStep.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	stepName: PropTypes.string
};

/**@ignore
 * Get wizardStep component default props
 */
WizardStep.defaultProps = {

};