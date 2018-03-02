import { Spinner } from '../basic/Spin';

module.exports = {

	

    show: function(id){
		new Spinner().spin(document.getElementById(id));
	},

	hide: function(id){
		$("#"+id).find(".spinner").remove();
	}



}
