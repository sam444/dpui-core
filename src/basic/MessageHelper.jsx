import config from "config";

module.exports = {

	// Message Type
	SUCCESS:	"success",
	INFO: 		"info",
	WARNING: 	"warning",
	ERROR: 		"error",

	// Message Position
	POSITION_TOP_LEFT: 					"toast-top-left",
	POSITION_TOP_CENTER: 				"toast-top-center",
	POSITION_TOP_RIGHT: 				"toast-top-right",
	POSITION_TOP_FULL_WIDTH:		"toast-top-full-width",

	POSITION_BOTTOM_LEFT: 			"toash-bottom-left",
	POSITION_BOTTOM_CENTER: 		"toast-bottom-center",
	POSITION_BOTTOM_RIGHT: 			"toast-botton-right",
	POSITION_BOTTOM_FULL_WIDTH:	"toast-bottom-full-width",

	// Default message position
	//DEFAULT_POSITION: 					"toast-top-right",

	getMessageOption: function(position, timeOut, progressBar){
		if (undefined == timeOut || null == timeOut || '' == timeOut) {
			timeOut = 5000;
		}
		if (undefined == progressBar || null == progressBar) {
			progressBar = true;
		}
		return {
			closeButton: true,
			debug: false,
			progressBar: progressBar,
			positionClass: position,
			onclick: null,
			showDuration: "300", //显示动作（从无到有这个动作）持续的时间
			hideDuration: "1000", //隐藏动作持续的时间
			timeOut: timeOut, //间隔的时间
			extendedTimeOut: "1000",
			showEasing: "swing",
			hideEasing: "linear",
			showMethod: "fadeIn",
			hideMethod: "fadeOut",
			preventDuplicates:true
		};
  },

    clear: function(){
		toastr.clear();
	},

	// success -> green
	success: function(message, title, position, timeOut, progressBar){
		//toastr.success(title, message);
		toastr.options = this.getMessageOption(this.handlerPosition(this.SUCCESS, position), timeOut, progressBar);
		let $toast = toastr[this.SUCCESS](this.handleMessage(message), title);
	},

	// info -> blue
	info: function(message, title, position, timeOut, progressBar){
		//toastr.info(title, message);

		toastr.options = this.getMessageOption(this.handlerPosition(this.INFO, position), timeOut, progressBar);
		let $toast = toastr[this.INFO](this.handleMessage(message), title);
	},

	// warning -> orange
	warning: function(message, title, position, timeOut, progressBar){
		//toastr.warning(title, message);

		toastr.options = this.getMessageOption(this.handlerPosition(this.WARNING, position), timeOut, progressBar);
		let $toast = toastr[this.WARNING](this.handleMessage(message), title);
	},

	// error -> red
	error: function(message, title, position, timeOut, progressBar, callback){
		//toastr.error(title, message);

		toastr.options = this.getMessageOption(this.handlerPosition(this.ERROR, position), timeOut, progressBar);
		if (!timeOut) {
			toastr.options.timeOut = 60 * 60 * 1000;
			toastr.options.extendedTimeOut = 60 * 60 * 1000;
		}
		if (callback && typeof callback == "function") {
			toastr.options.onclick = callback;
		}
		let $toast = toastr[this.ERROR](this.handleMessage(message), title);
	},

	handlerPosition: function(messageType, position){
		switch(messageType){
			case (this.SUCCESS):
				if(position == undefined || position == null){
					return config.DEFAULT_MESSAGE_POSITION.SUCCESS_POSITION;
				}
				return position;

			case (this.INFO):
				if(position == undefined || position == null){
					return config.DEFAULT_MESSAGE_POSITION.INFO_POSITION;
				}
				return position;

			case (this.WARNING):
				if(position == undefined || position == null){
					return config.DEFAULT_MESSAGE_POSITION.WARNING_POSITION;
				}
				return position;

			case (this.ERROR):
				if(position == undefined || position == null){
					return config.DEFAULT_MESSAGE_POSITION.ERROR_POSITION;
				}
				return position;

			default:
				return config.DEFAULT_MESSAGE_POSITION.DEFAULT_POSITION;
		}
	},

	handleMessage(message){
		if(_.isArray(message)){
			for (let i = 0; i < message.length - 1; i++) {
				message[i] = message[i].concat("<br/>");
			}
			return message;
		}else{
			return message;
		}
	}

}
