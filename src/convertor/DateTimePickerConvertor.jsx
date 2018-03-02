import config from 'config';

const DateTimePickerConvertor = {

    getAsObject: function (component, value) {
        if (value == undefined || value == null) {
            return null;
        }

        let format = this.getFormat(component);
        if (format == "YYYY") {
            return value;
        }
        if (format.indexOf("ii") >= 0) {
            format = format.replace('ii', 'mm');
        }
        if (format.indexOf("24") >= 0) {
            value = moment(value, config.DEFAULT_DATETIME_SUBMIT_FORMATER);
        }
        let convertorValue = moment(value, format).format(config.DEFAULT_DATETIME_SUBMIT_FORMATER);
        if (convertorValue == "Invalid date" || format.length > value.length) {
            return value;
        }
        return convertorValue;
    },

    getAsString: function (component, value) {
        if (value == undefined || value == null) {
            return null;
        }

        let format = this.getFormat(component);
        if (format.indexOf("ii") >= 0) {
            format = format.replace('ii', 'mm');
        }

        if (format.indexOf("24") >= 0) {
            let hour = moment(value).get("hour");
            let minute = moment(value).get('minute');
            let second = moment(value).get('second');
            if(hour =="0" && minute =="0" && second =='0'){
                value = moment(value).subtract('second', 1);
            }
        }
        let convertorValue = moment(value, config.DEFAULT_DATETIME_SUBMIT_FORMATER).format(format);
        if (convertorValue == "Invalid date" || convertorValue == null || convertorValue == undefined) {
            return value;
        }
        return convertorValue;
    },


    getFormat: function (component) {
        let format = config.DEFAULT_DATETIME_FORMATER;
        if (component.props.format != undefined) {
            format = component.props.format;
        }

        return format;
    }

};

module.exports = DateTimePickerConvertor;