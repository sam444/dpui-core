import Component from "../basic/Component";
import Blank from '../input/Blank';
import config from "config";
import PropTypes from 'prop-types';

export default class SmartPanelGrid extends Component {

	renderComponent(){
		return (<div style={this.props.style} className={this.props.className}>{this.renderLayout()}</div>)
	}

	renderLayout(){
		if (this.props.layout == "horizontal"){
			return <div className={"smartHorizontal"}>{this.renderChild()}</div>;
		}else{
			return <div className={"smartvertical"}>{this.renderChild()}</div>;
		}
	}

	/**@ignore
	 * Render Layout
	 */
	renderChild() {
		let _self = this;
		let {children} = this.props;

		if(React.Children.count(children) == 0){
			return <noscript/>;
		}

		else if(React.Children.count(children) == 1){
			let child = children;
			if ($.isArray(children) && children.length == 1) {
				child = children[0];
			}
			if(this.props.layout != undefined/* && children.props.layout == undefined*/){
				let newChild = {...child};
				newChild.props = {...child.props};
				newChild.props.layout = _self.props.layout;
				child = newChild;
				//child.props.layout = this.props.layout;
			}
			if(this.props.widthAllocation != undefined && child.props.widthAllocation == undefined){
				let newChild = {...child};
				newChild.props = {...child.props};
				newChild.props.widthAllocation = _self.props.widthAllocation;
				child = newChild;
				//child.props.widthAllocation = this.props.widthAllocation;
			}
			let dom = [];
			let remainCols = this.props.column - child.colspan;
			dom.push(<div className="row"><div className={this.getColumnClass(child)}>{child}</div></div>);
			for (let i = 0; i < remainCols; i++) {
				dom.push(<div className={_self.getColumnClass(Blank)}><Blank/></div>);
			}

			return dom;
		}

		else {
			let dom = [], domTemp = [], start = 1, remainCols = 0;
			let childrenSize = children.length;
			children.map(function(child, index){
				if(child != null && child != undefined){
					if(_self.props.layout != undefined){
						let newChild = {...child};
						newChild.props = {...child.props};
						newChild.props.layout = _self.props.layout;
						child = newChild;
						//child.props.layout = _self.props.layout;
					}
					if(_self.props.widthAllocation != undefined){
						let newChild = {...child};
						newChild.props = {...child.props};
						newChild.props.widthAllocation = _self.props.widthAllocation;
						child = newChild;
						//child.props.widthAllocation = _self.props.widthAllocation;
					}

					domTemp.push(<div className={_self.getColumnClass(child)}>{child}</div>);
					start = (child != undefined && child.props.colspan != undefined) ? (start + parseInt(child.props.colspan) - 1) : start;
					if((index + start) % _self.props.column == 0){
						dom.push(<div className="row">{domTemp}</div>);
						domTemp = [];
					} else if (index == (childrenSize - 1)) {
						remainCols = (_self.props.column - ((index + start) % _self.props.column)) % _self.props.column;
					}
				} else {
					start = start + 1;
				}
			});

			if(domTemp.length > 0){
				for (let i = 0; i < remainCols; i++) {
					domTemp.push(<div className={_self.getColumnClass(Blank)}><Blank/></div>);
				}
				dom.push(<div className="row">{domTemp}</div>);
			}

			return dom;
		}
	}

	/**@ignore
	 * Get column class
	 */
	getColumnClass(children){
		if(this.props.column != null && this.props.column != undefined){
			let column = 12 / this.props.column;

			if(children != undefined && React.isValidElement(children) && children.props.colspan != null && children.props.colspan != undefined){
				column = children.props.colspan * column;
			}
			return ("col-sm-" + 12 + " col-md-" + 6 + " col-lg-" + column)
		}
		return "";
	}

};


/**@ignore
 * SmartPanelGrid component prop types
 */
SmartPanelGrid.propTypes =  $.extend({}, Component.propTypes, {
	id: PropTypes.string,
	layout: PropTypes.oneOf(["horizontal", "vertical", "inline"]),
	column: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	widthAllocation: PropTypes.string,
	styleClassAllocation: PropTypes.string,
	smartClass:PropTypes.string
});

/**@ignore
 * Get dynamicSection component default props
 */
SmartPanelGrid.defaultProps = $.extend({}, Component.defaultProps, {
	column: config.SMART_PANELGRID_COLUMN,
	smartClass:"smart-default"
});
