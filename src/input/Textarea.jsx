import Input from "../basic/Input";
import ConvertorConstant from '../convertor/ConvertorConstant';
import { Util } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Textarea extends Input {

    renderInput() {
        return (
            <textarea id={this.componentId} name={this.getName()} className="form-control" maxLength={this.props.maxLength}
                cols={this.props.cols} rows={this.props.rows} placeholder={this.props.placeHolder} 
                style={this.getStyle()} data-auto-test={this.getNameForTest()}>
            </textarea>
        );
    }

    checkMaxInput() {  
            const  maxLen = this.props.maxLength;  
            const $obj = $("#"+this.componentId);
            const $objDiv = $("#for-input-"+this.componentId);
            const newid = $obj.attr("id") + 'msg';  
            const strResult = '<span id="' + newid + '" class=\'textarea-max-msg\' >' + (maxLen - $obj.val().length) + '/'+this.props.maxLength+'</span>'; 
            const $msg = $("#" + newid);  
            if ($msg.length == 0) {  
                $objDiv.after(strResult);  
            }  
            else {  
                $msg.html(strResult);  
            }  
    }  

    renderOutput() {
        const output = this.getOutputValue();
        return (
            <textarea className="form-control" style={this.getStyle()} value={output}
                cols={this.props.cols} title={this.getI18n(this.props.title)} rows={this.props.rows} readonly="readonly">
            </textarea>);
    }

    getStyle() {
        let { cols, rows, style, resize } = this.props;
        let styleDefine = '';
        if (cols && rows) {
            styleDefine = 'both';
        } else if (cols && !rows) {
            styleDefine = 'cols';
        } else if (!cols && rows) {
            styleDefine = 'rows';
        } else {
            styleDefine = 'none';
        }

        switch (styleDefine) {
            case 'cols':
                return $.extend({}, style, { width: "auto", resize: resize });
            case 'rows':
                return $.extend({}, style, { height: "auto", resize: resize });
            case 'both':
                return $.extend({}, style, { width: "auto", height: "auto", resize: resize });
            case 'none':
                return $.extend({}, style, { resize: resize });
        }
    }

    getConvertorId() {
        return ConvertorConstant.TEXTAREA_CONVERTOR;
    }

    componentDidUpdate(nextProps, nextState) {
        super.componentDidUpdate(nextProps, nextState);
        this.clearValidationInfo(nextProps);
    }

    clearValidationInfo(nextProps){
        const inputObject =  $("#" + this.componentId);
        if(Util.parseBool(nextProps.required)&&inputObject.val()){
            inputObject.parent().next().remove();
            const errorInputObject = inputObject.closest(".form-group");
            if(errorInputObject.hasClass("has-error")){
                inputObject.css("border", "2px solid #E1E8EE");
            };
        }
    }

};

/**@ignore
 * Textarea component prop types
 */
Textarea.propTypes = $.extend({}, Input.propTypes, {
    cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    resize: PropTypes.oneOf(["none", "both", "horizontal", "vertical"]),
    componentType:PropTypes.string,
    maxLength:PropTypes.string,
});

/**@ignore
 * Get Textarea component default props
 */
Textarea.defaultProps = $.extend({}, Input.defaultProps, {
    resize: "both",
    componentType:"textarea",
    maxLength:"200"
});
