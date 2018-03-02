import Component from "../basic/Component";
import PropTypes from 'prop-types';

export default class Cell extends Component {

	renderComponent(){
		let tempClass = '';

		if (this.props.className != null) {
			tempClass = this.props.className + ' ';
		}

		if (this.props.type == 'row') {
			return (
				<div className={tempClass + 'row'} style={this.props.style}>
					{this.props.children}
				</div>
			);
		}

		if (this.props.type == 'flex') {
			return (
				<div className={tempClass} style={this.props.style}>
					{this.props.children}
				</div>
			);
		}

		return (
			<div id={this.props.id} className={tempClass + this.getWidthClass()} style={this.props.style}>{this.props.children}</div>
		);
	}
	
	getWidthClass(){
		let width = this.props.width;
		return "col-sm-" + width + " col-md-" + width + " col-lg-" + width;
	}
	
};


/**@ignore
 * Cell component prop types
 */
Cell.propTypes =  $.extend({}, Component.propTypes, {
	id: PropTypes.string,
	value: PropTypes.string,
	colspan: PropTypes.string,
	width: PropTypes.string,
	type: PropTypes.string
});
/**@ignore
 * Get dynamicSection component default props
 */
Cell.defaultProps = $.extend({}, Component.defaultProps, {
	componentType: "Cell",
	width: 12
});
