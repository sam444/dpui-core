import Param from "../basic/Param";
import OnClickEvent from '../event/OnClickEvent';
import {Util} from 'rainbow-foundation-tools';
import Component from "../basic/Component";
import PropTypes from 'prop-types';

export default class MenuItem extends Component {

	render(){
		if (!Util.parseBool(this.props.visibled)) {
			return <noscript/>;
		}

		return (
			<li id={this.props.id} className={"nav-item " + this.props.active}>
				<a className={"nav-link " + this.props.enabled} href="javascript: void(0);"
				   onClick={this.onClickItem.bind(this)}>
					{this.renderIcon()}
					{this.getI18n(this.props.value)}
				</a>
			</li>
		);
	}

	getEnabled(){
		if(!Util.parseBool(this.props.enabled)){
			return " disabled";
		}
		return "";
	}

	renderIcon(){
		if(this.props.icon != null && this.props.icon != undefined){
			const iconClass = this.props.badges?`${this.props.icon} badges`:this.props.icon
			if(this.props.value){
				return (<span className={iconClass} style={{paddingRight: '5px'}}>{this.renderBadges()}</span>);
			}
			return (<span className={iconClass}>{this.renderBadges()}</span>);
		}
		return <noscript/>;
	}

	renderBadges(){
		if(this.props.badges){
			return (<span className={"badge badge-pill badge-"+this.props.badgeClass}>{this.props.badges}</span>)
		}
	}

	onClickItem(event){
		event.preventDefault();
		if(this.getEnabled() == "disabled"){
			return;
		}

		if(this.props.onClick != undefined){
			this.props.onClick(new OnClickEvent(this, event, Param.getParameter(this)));
		}
	}

};


/**@ignore
 * UIMenuItem component prop types
 */
MenuItem.propTypes = {
	id: PropTypes.string,
	value: PropTypes.string,
	//text: PropTypes.string,
	icon: PropTypes.string,
	active: PropTypes.string,
	badgeClass: PropTypes.string,
	enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	visibled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	onClick: PropTypes.func
};

/**@ignore
 * Get menuItem component default props
 */
MenuItem.defaultProps = {
	componentType: "MenuItem",
	badgeClass:'success',
	role: null,
	enabled: null,
	visibled: true
};
