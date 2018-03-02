module.exports = {
    Data: {
        All: "所有",
    },

    // DataTable
    DataTable: {
        SelectAll: "多選",
        SingleSelect: "單選",
    },

    // Pagination
    DropDownInfo: "每頁{0}",
    Search: "搜索",
    FirstPage: "首頁",
    PreviousPage: "上一頁",
    NextPage: "下一頁",
    LastPage: "尾頁",

    // Input
    // Select
    BlankOption: "請選擇",

    // DateRangePicker
    DateRangePicker: {
        ApplyLabel: '確定',
        CancelLabel: '取消',
        FromLabel: '起始時間',
        ToLabel: '結束時間',
        CustomRangeLabel: '自定義',
        DaysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        MonthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },

    // TwoText
    TwoText: {
        dialogTitle: "搜索Code Table",
        tableHeaderTitle: "搜索Code Table表格",
        keyColumn: "鍵",
        valueColumn: "值",
        confirmButton: "確認",
        cancelButton: "取消",
        error: "請選擇一條記錄",
    },

    // Data
    // FullCalendar
    FullCalendar: {
        MonthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        MonthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        DayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        DayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        Today: ["今天"],
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
        dictDefaultMessage: "拖動檔案至該處(或點擊此處)",
        dictFallbackMessage: "瀏覽器不支持拖放檔案上傳",
        dictFallbackText: "請使用傳統方式上傳檔案",
        dictInvalidFileType: "不能上傳該類型檔案,檔案類型不支持。",
        dictFileTooBig: "檔案過大({{filesize}}MB). 上傳檔案最大支持: {{maxFilesize}}MB.",
        dictResponseError: "檔案上傳失敗",
        dictCancelUpload: "取消上傳",
        dictCancelUploadConfirmation: "確定要取消上傳嗎?",
        dictRemoveFile: "移除檔案",
        dictMaxFilesExceeded: "一次最多只能上傳{{maxFiles}}個檔案",
    },

    MSG_NOT_FOUND: "資訊沒有找到",
    MSG_REGULAR_EXPRESSION_ERROR: "輸入的字符串不符合正則表達式",
    MSG_DATACONTEXT_KEY_DUPLICATE: "(DataContext key)重復,請檢查.",

    //validator message
    InputValidator: {
      RequiredMessage: "欄位必填，不能為空",
      LengthMessage: "欄位值長度必須大於{0}個，小於{1}個",
      MinLengthMessage: "欄位值長度必須大於{0}個",
      MaxLengthMessage: "欄位值長度必須小於{0}個",
    },
    DigitValidator: {
      ValueMessage: "值必須大於{0}，小於{1}",
      MinValueMessage: "值必須大於{0}",
      MaxValueMessage: "值必須小於{0}",
    },
    EmailValidator: "郵箱地址不合法",
    Page: {
        needContinue: "繼續操作?",
        messageFront: "登出後",
        messageEnd:"秒後退出.",
        confirm:"確認"
    }
};
