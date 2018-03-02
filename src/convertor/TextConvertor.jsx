var TextConvertor = {

    getAsObject: function (component, value) {
        if (component.props.pattern != undefined) {
            value = value.replace(/-/g, "").replace(/_/g, "");
        }
        return value;
    },

    getAsString: function (component, value) {
        return value;
    }

};

module.exports = TextConvertor;
