import Input from "../basic/Input";
import Param from "../basic/Param";
import OnBlurEvent from '../event/OnBlurEvent';
import OnChangeEvent from '../event/OnChangeEvent';
import config from "config";
import DateTimePickerConvertor from '../convertor/DateTimePickerConvertor';
import ConvertorConstant from '../convertor/ConvertorConstant';
import { StringUtil, Util } from 'rainbow-foundation-tools';
import I18NUtil from "../i18n/I18NUtil";
import r18n from "../i18n/reactjs-tag.i18n";
import PropTypes from 'prop-types';

export default class DateTimePicker extends Input {


    renderInput() {
        this.isEnabled();
        return (
            <div className="input-group date dateTime">
                <input id={this.componentId} name={this.getName()} title={this.getI18n(this.props.title)} type="text" className="form-control" style={this.props.style}
                    placeholder={this.props.placeholder ? this.props.placeholder : ""} 
                    data-auto-test={this.getNameForTest()} />
                <span className="input-group-addon pickerposition" style={{ verticalAlign: "top" }}>
                    <span className="glyphicon glyphicon-calendar"
                        onClick={this.onClickIcon.bind(this)} />
                </span>
            </div>
        );
    }

    formatDateofManualInput(event) {
        let inputValue = this.getInputValue(event);
        if (StringUtil.isEmpty(inputValue)) {
            this.deleteInputValue(event);
        }

        let format = config.DEFAULT_DATETIME_FORMATER;
        if (this.props.format) {
            format = this.props.format;
        }
        if (format.indexOf("ii") >= 0) {
            format = format.replace('ii', 'mm');
        }
        if (inputValue) {
            let tempInputValue = inputValue.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\"|\'|\<|\.|\>|\/|\?|\:|\T]/g, "");
            let tempFormat = format.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\"|\'|\<|\.|\>|\/|\?|\:|\T]/g, "");
            if (tempInputValue.length == tempFormat.length) {
                let convertorValue = moment(tempInputValue, tempFormat).format(format);
                //比较日期
                let maxDate = this.getMaxDate();
                let minDate = this.getMinDate();
                if (maxDate && moment(convertorValue).isAfter(maxDate)) {
                    convertorValue = "";
                }
                if (minDate && moment(convertorValue).isBefore(minDate)) {
                    convertorValue = "";
                }
                $("#" + this.componentId).val(convertorValue);
                this.setComponentValue(event);
                if (this.props.onChange) {
                    let valueChangeEvent = new OnChangeEvent(this, event, Param.getParameter(this), convertorValue, this.onEvent.newValue);
                    this.props.onChange(valueChangeEvent);
                }
                this.onEvent = { newValue: convertorValue, oldValue: this.onEvent.newValue };
            }
        }
    }

    deleteInputValue(event) {
        event.preventDefault();
        const { model, property } = this.props;
        if (model && property) {
            model[property] = null;
        }
        $("#" + this.componentId).val(null);
    }

    isEnabled() {
        if (!Util.parseBool(this.props.enabled)) {
            this.props.isRemove = "false";
        }
    }

    initComponent() {
        let _self = this;
        const dateComponent = $("#" + this.componentId);
        const datetimepicker = $.fn.datetimepicker.dates["en"];
        const FullCalendar = r18n["FullCalendar"];
        datetimepicker["days"] = [FullCalendar["DayNames"][0], FullCalendar["DayNames"][1], FullCalendar["DayNames"][2], FullCalendar["DayNames"][3], FullCalendar["DayNames"][4], FullCalendar["DayNames"][5], FullCalendar["DayNames"][6], FullCalendar["DayNames"][0]];
        datetimepicker["daysShort"] = [FullCalendar["DayNamesShort"][0], FullCalendar["DayNamesShort"][1], FullCalendar["DayNamesShort"][2], FullCalendar["DayNamesShort"][3], FullCalendar["DayNamesShort"][4], FullCalendar["DayNamesShort"][5], FullCalendar["DayNamesShort"][6], FullCalendar["DayNamesShort"][0]];
        datetimepicker["daysMin"] = [FullCalendar["DayNamesShort"][0], FullCalendar["DayNamesShort"][1], FullCalendar["DayNamesShort"][2], FullCalendar["DayNamesShort"][3], FullCalendar["DayNamesShort"][4], FullCalendar["DayNamesShort"][5], FullCalendar["DayNamesShort"][6], FullCalendar["DayNamesShort"][0]];
        datetimepicker["months"] = [FullCalendar["MonthNames"][0], FullCalendar["MonthNames"][1], FullCalendar["MonthNames"][2], FullCalendar["MonthNames"][3], FullCalendar["MonthNames"][4], FullCalendar["MonthNames"][5], FullCalendar["MonthNames"][6], FullCalendar["MonthNames"][7], FullCalendar["MonthNames"][8], FullCalendar["MonthNames"][9], FullCalendar["MonthNames"][10], FullCalendar["MonthNames"][11]];
        datetimepicker["monthsShort"] = [FullCalendar["MonthNamesShort"][0], FullCalendar["MonthNamesShort"][1], FullCalendar["MonthNamesShort"][2], FullCalendar["MonthNamesShort"][3], FullCalendar["MonthNamesShort"][4], FullCalendar["MonthNamesShort"][5], FullCalendar["MonthNamesShort"][6], FullCalendar["MonthNamesShort"][7], FullCalendar["MonthNamesShort"][8], FullCalendar["MonthNamesShort"][9], FullCalendar["MonthNamesShort"][10], FullCalendar["MonthNamesShort"][11]];
        datetimepicker["meridiem"] = [FullCalendar["AM"], FullCalendar["PM"]];
        datetimepicker["today"] = FullCalendar["Today"][0];
        dateComponent.unbind("change");
        dateComponent.datetimepicker({
            forceParse: Util.parseBool(this.props.forceParse),
            format: this.getFormat(),
            useCurrent: false,
            keepInvalid: false,
            sideBySide: true,
            minuteStep: (this.props.minuteStep - 0),
            weekStart: this.props.weekStart,
            focusOnShow: false,
            startView: this.getStartView(),
            minView: this.getViewModel(),
            maxView: this.props.maxView,
            autoclose: true,
            collapse: false,
            calendarWeeks: false,
            keepOpen: false,
            date: this.getDate(),
            defaultDate: this.getDefaultDate(),
            startDate: this.getMinDate(),
            endDate: this.getMaxDate(),
            daysOfWeekDisabled: this.props.daysOfWeekDisabled,
            todayHighlight: Util.parseBool(this.props.showToday),
            todayBtn: Util.parseBool(this.props.showToday),
            showMeridian: Util.parseBool(this.props.showMeridian),
            ignoreReadonly: true
        }).on("changeDate", function (event) {
            _self.setComponentValue(event);
            let value = _self.getInputValue(event);
            if (_self.getDigitValue) {
                value = _self.getDigitValue(value);
            }

            if (_self.props.onChange) {
                let valueChangeEvent = new OnChangeEvent(_self, event, Param.getParameter(_self), value, _self.onEvent.newValue);
                _self.props.onChange(valueChangeEvent);
            }
            _self.onEvent = { newValue: value, oldValue: _self.onEvent.newValue };

            $("div.bootstrap-datetimepicker-widget.dropdown-menu").parent().children("input").blur();


            if (Util.parseBool(_self.props.required)) {
                if (value) {
                    dateComponent.parent().parent().removeClass("input-required");
                } else {
                    dateComponent.parent().parent().addClass("input-required");
                }
            }



        }).on("hide", function (event) {
            _self.setComponentValue(event);
            if ($(this).val()) {
                $(this).parent().parent().parent().removeClass("has-error");
                $(this).parent().nextAll().remove();
                $(this).parent().parent().nextAll().remove();
            }
        });
        if (Util.parseBool(this.props.manualInput)) {
            $("#" + this.componentId).removeAttr("readonly");
        } else {
            $("#" + this.componentId).attr("readonly", "readonly");
        }
    }
    getStartView() {
        let returnValue = 2;
        switch (this.props.startView) {
            case "years":
                returnValue = 4
                break;
            case "months":
                returnValue = 3
                break;
            case "hours":
                returnValue = 1
                break;
            case "days":
                returnValue = 2
                break;
            case "minutes":
                returnValue = 0
                break;
            default:
                returnValue = 2;
        }
        return returnValue;
    }

    getViewModel() {
        let returnValue = 2;
        switch (this.props.viewMode) {
            case "years":
                returnValue = 4
                break;
            case "months":
                returnValue = 3
                break;
            case "hours":
                returnValue = 1
                break;
            case "days":
                returnValue = 2
                break;
            case "minutes":
                returnValue = 0
                break;
            default:
                returnValue = 2;
        }
        return returnValue;
    }

    getInputValue(event) {
        //let inputRef = this.getInputRefProperty();
        if (Util.parseBool(this.props.inline)) {
            return DateTimePickerConvertor.getAsString(this, event.date);
        }
        //return React.findDOMNode(this.refs[inputRef]).value;
        return $('#' + this.componentId).val();
    }

    onClickIcon(event) {
        event.preventDefault();
        $("#" + this.componentId).focus();
    }

    getFormat() {
        if (this.props.format != undefined) {
            return this.props.format.toLowerCase();//.toLowerCase();
        } else {
            //if(this.props.minViewMode == "years" || this.props.minViewMode == 2){
            //	return "yyyy";
            //}
            return config.DEFAULT_DATETIME_FORMATER.split(" ")[0].toLowerCase();//.toLowerCase();
        }
    }

    getMinDate() {
        if (this.props.minDate != undefined) {
            let value = null;
            if (this.props.minDate == "TODAY") {
                let minToday = moment(moment().format("YYYYMMDD") + " 00:00:00", "YYYYMMDD HH:mm:ss");
                value = DateTimePickerConvertor.getAsObject(this, minToday.format(config.DEFAULT_DATETIME_SUBMIT_FORMATER));
            } else {
                value = DateTimePickerConvertor.getAsObject(this, this.props.minDate);
            }

            if (value != undefined) {
                let format = this.getFormat();
                if (format == "YYYY") {
                    return moment(value + "0101 00:00:00", "YYYYMMDD HH:mm:ss");
                }
                return value;
            }
        }
        return false;
    }

    getMaxDate() {
        if (this.props.maxDate != undefined) {
            let value = null;
            if (this.props.maxDate == "TODAY") {
                let maxToday = moment(moment().format("YYYYMMDD") + " 23:59:59", "YYYYMMDD HH:mm:ss");
                value = DateTimePickerConvertor.getAsObject(this, maxToday.format(config.DEFAULT_DATETIME_SUBMIT_FORMATER));
            } else {
                value = DateTimePickerConvertor.getAsObject(this, this.props.maxDate);
            }

            if (value != undefined) {
                let format = this.getFormat();
                if (format == "YYYY") {
                    return moment(value + "1231 23:59:59", "YYYYMMDD HH:mm:ss");
                }
                return value;
            }
        }
        return false;
    }

    getDefaultDate() {
        let defaultDate = DateTimePickerConvertor.getAsObject(this, this.props.defaultValue);
        if (defaultDate) {
            let maxDate = this.getMaxDate();
            let minDate = this.getMinDate();
            if ((maxDate && moment(defaultDate).isAfter(maxDate)) || (minDate && moment(defaultDate).isBefore(minDate))) {
                defaultDate = "";
                const { model, property } = this.props;
                if (model && property) {
                    model[property] = null;
                }
                $("#" + this.componentId).val(defaultDate);
            }
        }
        return defaultDate;
    }

    getDate() {
        let date = DateTimePickerConvertor.getAsObject(this, this.getComponentValue());
        if (date) {
            let maxDate = this.getMaxDate();
            let minDate = this.getMinDate();
            if ((maxDate && moment(date).isAfter(maxDate)) || (minDate && moment(date).isBefore(minDate))) {
                date = "";
                const { model, property } = this.props;
                if (model && property) {
                    model[property] = null;
                }
                $("#" + this.componentId).val(date);
            }

        }
        return date;
    }

    getConvertorId() {
        return ConvertorConstant.DATETIMEPICKER_CONVERTOR;
    }

    componentDidMount(){
        super.componentDidMount();
        this.forceSetDate();
    }

    componentDidUpdate(nextProps, nextState) {
        super.componentDidUpdate(nextProps, nextState);
        this.clearValidationInfo(nextProps);   
        $("#" + this.componentId).datetimepicker('update');

        if (nextProps.maxDate) {
            $("#" + this.componentId).datetimepicker('setEndDate', this.getMaxDate());
        }
        if (nextProps.minDate) {
            $("#" + this.componentId).datetimepicker('setStartDate', this.getMinDate());
        }
        this.forceSetDate();
    }

    clearValidationInfo(nextProps) {
        const inputObject = $("#" + this.componentId);
        if (Util.parseBool(nextProps.required) && inputObject.val()) {
            inputObject.parent().parent().next().remove();
            const errorInputObject = inputObject.closest(".form-group");
            if (errorInputObject.hasClass("has-error")) {
                inputObject.closest(".input-group").css("border", "2px solid #E1E8EE");
            };
        }
    }

    forceSetDate(){
        let date = DateTimePickerConvertor.getAsObject(this, this.getComponentValue());
        $("#" + this.componentId).datetimepicker("setDate", new Date(date));
    }

};


/**@ignore
 * DateTimePicker component prop types
 */
DateTimePicker.propTypes = $.extend({}, Input.propTypes, {
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    startView: PropTypes.oneOf(["decades", "years", "months", "days", "minutes"]),
    viewMode: PropTypes.oneOf(["decades", "years", "months", "days", "minutes"]),
    toolbarPlacement: PropTypes.oneOf(["default", "top", "bottom"]),
    daysOfWeekDisabled: PropTypes.array,
    maxView: PropTypes.number,
    inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    showClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    showToday: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    showClear: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    manualInput: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    minuteStep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    showMeridian: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    componentType: PropTypes.string,
    todayHighlight: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    forceParse: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
});

/**@ignore
 * Get DateTimePicker component default props
 */
DateTimePicker.defaultProps = $.extend({}, Input.defaultProps, {
    close: false,
    viewMode: "days",
    toolbarPlacement: "default",
    weekStart: 0, // day of the week start. 0 for Sunday - 6 for Saturday
    daysOfWeekDisabled: [],
    maxView: 3,
    showClose: false,
    showToday: false,
    showClear: false,
    inline: false,
    format: config.DEFAULT_DATETIME_FORMATER,
    manualInput: config.DEFAULT_DATE_MANUAL_INPUT,
    minuteStep: 5,
    startView: 'days',
    showMeridian: false,
    componentType: "datetimepicker",
    todayHighlight: false,
    forceParse: true
});
