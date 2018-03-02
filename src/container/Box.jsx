import Component from "../basic/Component";
import PropTypes from 'prop-types';

export default class Box extends Component {

	render() {
		let className = 'boxPadding ' + this.props.className;
		let _self = this, {children} = this.props;
		let count = React.Children.count(children);
		let childrenArray = [];

		if(/*React.Children.count(children)*/count == 0){
			return <noscript/>;
		}

		else if(/*React.Children.count(children)*/count == 1){
			//return children;
			childrenArray.push(children);
		}

		else {
			children.map(function(child, index){
				childrenArray.push(child);

				if(count != index + 1){
					childrenArray.push(<span style={{paddingRight: _self.props.gap}} />);
				}
			});
		}

		return (<div className={className} style={{textAlign: this.props.direction,padding:this.props.padding}}>{childrenArray}</div>);
	}

};


/**@ignore
 * Box component prop types
 */
Box.propTypes = {
	direction: PropTypes.oneOf(["left", "center", "right"]),
	gap: PropTypes.string,
	padding: PropTypes.string,
	className: PropTypes.string
},

/**@ignore
 * Get Box component default props
 */
Box.defaultProps = {
	direction: "right",
	gap: "15px",
	className: ''
};
