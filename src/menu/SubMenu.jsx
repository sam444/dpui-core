import Component from "../basic/Component";
import PropTypes from 'prop-types';

export default class SubMenu extends Component {
	
	render(){
		return <noscript/>;
	}
	
};


/**@ignore
 * SubMenu component prop types
 */
SubMenu.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	icon: PropTypes.string,
	visibled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

/**@ignore
 * Get subMenu component default props
 */
SubMenu.defaultProps = {
	componentType: "SubMenu",
	visibled: true
};
