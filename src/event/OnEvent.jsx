export default class OnEvent {

    /**@ignore
     * @Param: component
     * @Param: jsEvent
     * @Param: paramJson, eg: [{name: 'a', value: 'b'}, {name: 'a', value: 'b'}, ...]
     */
    constructor(component, jsEvent, paramJson) {
        this.component = component;
        this.jsEvent = jsEvent;
        this.paramJson = paramJson;
    }

    /**@ignore
     * @Param: name
     * Get parameter by name
     */
    getParameter(name) {
        let value = null;
        $.each(this.paramJson, function (index, element) {
            if (element.name == name) {
                value = element.value;
                return;
            }
        });

        return value;
    }

    /**@ignore
     * Get javascript event
     */
    getJsEvent() {
        return this.jsEvent;
    }

    getParamJson() {
        return this.paramJson;
    }

    getComponent() {
        return this.component;
    }

    toString() {
        return "==Event==";
    }

}
