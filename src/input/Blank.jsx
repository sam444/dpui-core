import Input from "../basic/Input";

export default class Blank extends Input {

    renderInput() {
        return (
            <div className="input-group blank-style"></div>
        );
    }
    
};


/**@ignore
 * Text component prop types
 */
Blank.propTypes = $.extend({}, Input.propTypes, {});
