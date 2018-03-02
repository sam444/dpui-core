module.exports = {
    Data: {
        All: "所有",
    },

    // DataTable
    DataTable: {
        SelectAll: "多选",
        SingleSelect: "单选",
        NoResult:"没有记录"
    },

    // Pagination
    DropDownInfo: "每页{0}",
    Search: "搜索",
    FirstPage: "首页",
    PreviousPage: "上一页",
    NextPage: "下一页",
    LastPage: "尾页",
    Pages: "页",


    // Input
    // Select
    BlankOption: "请选择",

    // DateRangePicker
    DateRangePicker: {
        ApplyLabel: '确定',
        CancelLabel: '取消',
        FromLabel: '起始时间',
        ToLabel: '结束时间',
        CustomRangeLabel: '自定义',
        DaysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        MonthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },

    // TwoText
    TwoText: {
        dialogTitle: "搜索Code Table",
        tableHeaderTitle: "搜索Code Table表格",
        keyColumn: "键",
        valueColumn: "值",
        confirmButton: "确认",
        cancelButton: "取消",
        error: "请选择一条记录",
    },

    // Data
    // FullCalendar
    FullCalendar: {
        MonthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        MonthNamesShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        DayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        DayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
        Today: ["今天"],
        AM:"上午",
        PM:"下午",
        FirstDay: 1,
        ButtonText: {
            //Prev: "<",
            //Next: ">",
            Prev: "上一月",
            Next: "下一月",
            Today: "本月",
            Month: "月",
            Week: "周",
            Day: "日"
        }
    },

    // Integration
    // DropZone
    DropZone: {
        dictDefaultMessage: "拖动文件至该处(或点击此处)",
        dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
        dictInvalidFileType: "你不能上传该类型文件,文件类型不支持。",
        dictFileTooBig: "文件过大({{filesize}}MB). 上传文件最大支持: {{maxFilesize}}MB.",
        dictResponseError: "文件上传失败!",
        dictCancelUpload: "取消上传",
        dictCancelUploadConfirmation: "你确定要取消上传吗?",
        dictRemoveFile: "移除文件",
        dictMaxFilesExceeded: "您一次最多只能上传{{maxFiles}}个文件",
    },

    MSG_NOT_FOUND: "信息没有找到",
    MSG_REGULAR_EXPRESSION_ERROR: "输入的字符串不符合正则表达式",
    MSG_DATACONTEXT_KEY_DUPLICATE: "(DataContext key)重复,情检查.",

    //validator message
    InputValidator: {
      RequiredMessage: "该字段必填，不能为空",
      LengthMessage: "字段长度必须大于{0}个，小于{1}个",
      MinLengthMessage: "字段长度必须大于{0}个",
      MaxLengthMessage: "字段长度必须小于{0}个",
    },
    DigitValidator: {
      ValueMessage: "值必须大于{0}，小于{1}",
      MinValueMessage: "值必须大于{0}",
      MaxValueMessage: "值必须小于{0}",
    },
    EmailValidator: "邮箱地址不合法",
    Page: {
        needContinue: "继续操作?",
        messageFront: "",
        messageEnd:"秒后退出.",
        confirm:"确认"
    },
    Required:"必填选项"
};
