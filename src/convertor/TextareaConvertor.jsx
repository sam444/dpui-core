var TextareaConvertor = {

    getAsObject: function (component, value) {
        if (value != undefined && value != null) {
            //return SecurityUtil.escapeHTML(value).replace(/[\r\n]/g, "<br/>");
            return value.replace(/[\r\n]/g, "<br/>");
        }
        return value;
    },

    getAsString: function (component, value) {
        if (value != undefined && value != null) {
            //return SecurityUtil.unescapeHTML(value).replace(new RegExp("<br/>", "gm"), "\r\n");
            return value.replace(new RegExp("<br/>", "gm"), "\r\n");
        }
        return value;
    }

};

module.exports = TextareaConvertor;
