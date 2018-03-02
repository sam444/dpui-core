var Immutable = require("immutable");
let index = new Date().getTime();
let componentList = Immutable.List();
import {ArrayUtil} from 'rainbow-foundation-tools';
module.exports = {

    /**@ignore
     * Generate component unique id
     */
    generateId(){
        return "rainbow-ui-" + (index++);
    },

    /**@ignore
     * Add component id
     */
    addComponentId(){
        if (this.componentId) {
            componentList = componentList.push(this.componentId);
        }
    },

    /**@ignore
     * Clear component id
     */
    clearComponentId(){
        index = 0;
        componentList = componentList.clear();
    },

    /**@ignore
     * Validate component id
     */
    validateComponentId(){
        let repeatElement = ArrayUtil.repeatElement(componentList.toJS());

        if (repeatElement != null) {
            throw Error("The page have repeat element id, it is " + repeatElement);
        }
    }

};
