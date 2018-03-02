import KeyValue from "../basic/KeyValue";
import PropTypes from 'prop-types';

export default class SelectionMode extends KeyValue {
	
	renderInput(){
		if("single" == this.props.selectionMode){
			return (
				<input id={this.props.id} name={this.props.name} type="radio" />
			);
		}
		
		else if("multiple" == this.props.selectionMode){
			return (
				<input id={this.props.id} name={this.props.name} type="checkbox" />
			);
		}
		return <noscript/>;
	}
	
	componentDidMount(){
		if(this.props.io != "out"){
			this.initEvent();
			this.initValue();
		}
	}
	
	componentDidUpdate(){
		if(this.props.io != "out"){
			this.initEvent();
			this.initValue();
		}
	}
	
	/**@ignore
	 * Init code table event
	 */
	initEvent() {
		let _self = this;
		
		// handle onchange event
		$("#" + this.props.id).change(function(event){
			//_self.onComponentChange(event);
			
			if(_self.props.onChange){
				_self.props.onChange(event);
			}
		});
	}

	initValue(){
		let value = this.getComponentValue();

		if(value == "1" || value == 1){
			$("#" + this.props.id).prop("checked", true);
		} else {
			$("#" + this.props.id).removeAttr("checked");
		}
	}
	
	getInputValue(event){	
  	return $("#" + this.props.id).is(":checked") ? 1 : 0;
  }
	
};


/**@ignore
 * SelectionMode component prop types
 */
SelectionMode.propTypes = $.extend({}, KeyValue.propTypes, {
	selectionMode: PropTypes.oneOf(["single", "multiple"])
});

/**@ignore
 * Get SelectionMode component default props
 */
SelectionMode.defaultProps = $.extend({}, KeyValue.defaultProps, {
	selectionMode: "single"
});
