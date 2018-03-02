'use strict';

module.exports = {
    //basic
    Component: require('./basic/Component'),
    Command: require('./basic/Component'),
    CodeTable: require('./basic/CodeTable'),
    CodeTableSorter: require('./basic/CodeTableSorter'),
    Param: require('./basic/Param'),
    KeyValue: require('./basic/KeyValue'),
    UIEvent: require('./basic/Event'),
    UIMessageHelper: require('./basic/MessageHelper'),

    //button
    UIButton: require('./button/Button'),
    UILink: require('./button/Link'),
    UISplitButton: require('./button/SplitButton'),
    UIButtonItem: require('./button/ButtonItem'),

    //container
    UIBox: require('./container/Box'),
    UICell: require('./container/Cell'),
    //UIPanel: require('./container/Panel'),
    UISmartPanelGrid: require('./container/SmartPanelGrid'),
    UITab: require('./container/tab/Tab'),
    UITabItem: require('./container/tab/TabItem'),
    UIWizard: require('./container/wizard/Wizard'),
    UIWizardStep: require('./container/wizard/WizardStep'),
    UICard: require('./container/card/Card'),
    UICardGroup: require('./container/card/CardGroup'),
    UIUpdatePanel: require('./container/UpdatePanel'),

    //data
    UIDataTable: require('./data/DataTable'),
    UIColumn: require('./data/Column'),

    //dialog
    UIDialog: require('./dialog/Dialog'),
    UIConfirmDialog: require('./dialog/ConfirmDialog'),

    //display
    UILabel: require('./display/Label'),
    UIIcon: require('./display/Icon'),
    UISpinner: require('./display/Spinner'),

    //file
    UIFileDownload: require('./file/FileDownload'),
    UIFileUpload: require('./file/FileUpload'),

    //input
    UIInput: require('./basic/Input'),
    UIBlank: require('./input/Blank'),
    UICheckbox: require('./input/Checkbox'),
    UICurrency: require('./input/Currency'),
    UIDateTimePicker: require('./input/DateTimePicker'),
    UISwitch: require('./input/Switch'),
    UISelect: require('./input/Select'),
    UIText: require('./input/Text'),
    UIEmail: require('./input/Email'),
    UINumber: require('./input/Number'),
    UIPassword: require('./input/Password'),
    UIPercent: require('./input/Percent'),
    UIRadio: require('./input/Radio'),
    UITextarea: require('./input/Textarea'),

    //menu
    UIMenuBar: require('./menu/MenuBar'),
    UIMenu: require('./menu/Menu'),
    UIMenuItem: require('./menu/MenuItem'),
    UISubMenu: require('./menu/SubMenu'),
    UISeparator: require('./menu/Separator'),

    //page
    UIPage: require('./page/Page'),
    UIPagination: require('./page/Pagination'),

    //event
    OnEvent: require('./event/OnEvent'),
    OnBlurEvent: require('./event/OnBlurEvent'),
    OnChangeEvent: require('./event/OnChangeEvent'),
    OnClickEvent: require('./event/OnClickEvent'),
    OnFocusEvent: require('./event/OnBlurEvent'),
    OnRowSelectEvent: require('./event/OnRowSelectEvent'),
    OnTabChangeEvent: require('./event/OnTabChangeEvent'),
    OnToggleEvent: require('./event/OnToggleEvent'),

    //i18n
    I18nUtil: require('./i18n/I18NUtil'),

    //convertor
    Convertor: require('./convertor/Convertor'),
    ConvertorConstant: require('./convertor/ConvertorConstant'),
    DateTimePickerConvertor:require('./convertor/DateTimePickerConvertor'),

};