import PropTypes from 'prop-types';

export default class TabItem extends React.Component {

	render(){
		return <noscript/>;
	}

};

/**@ignore
 * TabItem component prop types
 */
TabItem.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	icon: PropTypes.string,
	badge: PropTypes.string,
	style: PropTypes.string,
	disabled:PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	className: PropTypes.string
};

/**@ignore
 * Get tabItem component default props
 */
TabItem.defaultProps = {
	componentType: "TabItem",
	className: ''
};
