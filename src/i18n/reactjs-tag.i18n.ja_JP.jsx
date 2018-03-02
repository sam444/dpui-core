module.exports = {
    Data: {
        All: "オール",
    },

    // DataTable
    DataTable: {
        SelectAll: "マルチ セレクション",
        SingleSelect: "シングル セレクション",
        NoResult:"そこに記録はない"
    },

    // Pagination
    DropDownInfo: "どのページ{0}",
    Search: "検索",
    FirstPage: "トップ",
    PreviousPage: "前へ",
    NextPage: "次へ",
    LastPage: "最後",
    Pages: "ページ",

    // Input
    // Select
    BlankOption: "選択してください",

    // DateRangePicker
    DateRangePicker: {
        ApplyLabel: "確認",
        CancelLabel: "キャンセル",
        FromLabel: "スタート",
        ToLabel: "終了",
        CustomRangeLabel: "カスタマ",
        DaysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
        MonthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    },

    // TwoText
    TwoText: {
        dialogTitle: "検索コード表",
        tableHeaderTitle: "検索コード表",
        keyColumn: "キー",
        valueColumn: "値",
        confirmButton: "確認します",
        cancelButton: "キャンセル",
        error: "レコードを選択してください",
    },

    // Data
    // FullCalendar
    FullCalendar: {
        MonthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        MonthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        DayNames: ["日", "月", "火", "水", "木", "金", "土"],
        DayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
        Today: ["今日"],
        FirstDay: 1,
        AM:"上午",
        PM:"下午",
        ButtonText: {
            //Prev: "<",
            //Next: ">",
            Prev: "先月",
            Next: "翌月",
            Today: "今日",
            Month: "月",
            Week: "週",
            Day: "日"
        }
    },

    // Integration
    // DropZone
    DropZone: {
        dictDefaultMessage: "ファイル削除及びアップロード",
        dictFallbackMessage: "このBrowserがdrag'n'drop fileアップロードをサポートしません。",
        dictFallbackText: "以前通りFallbackで該当ファイルをアップロードしてください。",
        dictInvalidFileType: "このファイルタイプがアップロードできない、ファイルタイプがサポートされていない。",
        dictFileTooBig: "ファイルサイズが大きすぎです。アップロードファイルサイズの最大限が{{maxFilesize}}MB。",
        dictResponseError: "ファイルアップロード失敗",
        dictCancelUpload: "ファイルキャンセル",
        dictCancelUploadConfirmation: "本当に今回のアップロードをキャンセルしますか。",
        dictRemoveFile: "ファイル移出",
        dictMaxFilesExceeded: "最大サイズのファイルが一つでもアップロードできます。",
    },

    MSG_NOT_FOUND: "MSG NOT FOUND",
    MSG_REGULAR_EXPRESSION_ERROR: "入力文字列が正規表現に準拠していません!",
    MSG_DATACONTEXT_KEY_DUPLICATE: "(DataContext key)重複キー値",

    //validator message
    InputValidator: {
      RequiredMessage: "また必要ないと空",
      LengthMessage: "{0}値から、より多くでよりよい{1}よりもなければ",
      MinLengthMessage: "値が少ないからである{0}よりもなければ",
      MaxLengthMessage: "値が{1}よりも少ないからでなければなりません",
    },
    DigitValidator: {
      ValueMessage: "{0}値から、より多くでよりよい{1}よりもなければ",
      MinValueMessage: "値よりも{0}できなければ",
      MaxValueMessage: "値が少ないからである{0}よりもなければ",
    },
    EmailValidator: "入力された有効な電子メール・アドレスでない",
    Page: {
        needContinue: "続けます?",
        messageFront: "終了後",
        messageEnd:"秒.",
        confirm:"確認します"
    },
    Required:"必填"
};
