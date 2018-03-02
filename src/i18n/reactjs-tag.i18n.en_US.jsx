module.exports = {
    Data: {
        All: "All",
    },

    // DataTable
    DataTable: {
        SelectAll: "All",
        SingleSelect: "Single",
        NoResult:"There is no record."
    },

    // Pagination
    DropDownInfo: "Each page {0}",
    Search: "Search",
    FirstPage: "First",
    PreviousPage: "Previous",
    NextPage: "Next",
    LastPage: "Last",
    Pages: "P",

    // Input
    // Select
    BlankOption: "Please Select",

    // DateRangePicker
    DateRangePicker: {
        ApplyLabel: "Confirm",
        CancelLabel: "Cancel",
        FromLabel: "Start",
        ToLabel: "End",
        CustomRangeLabel: "Custom",
        DaysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },

    // TwoText
    TwoText: {
        dialogTitle: "Search Code Table",
        tableHeaderTitle: "Search Code Table",
        keyColumn: "Key",
        valueColumn: "Value",
        confirmButton: "Confirm",
        cancelButton: "Cancel",
        error: "Please select a record",
    },

    // Data
    // FullCalendar
    FullCalendar: {
        MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        MonthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        DayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        DayNamesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        Today: ["Today"],
        FirstDay: 1,
        AM:"am",
        PM:"pm",
        ButtonText: {
            //Prev: "<",
            //Next: ">",
            Prev: "last month",
            Next: "next month",
            Today: "today",
            Month: "month",
            Week: "week",
            Day: "day"
        }
    },

    // Integration
    // DropZone
    DropZone: {
        dictDefaultMessage: "Drop files or click here to upload",
        dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
        dictInvalidFileType: "You cannot upload the file type, file type is not supported.",
        dictFileTooBig: "The file is too large ({{filesize}}MB). The maximum upload file support: {{maxFilesize}}MB.",
        dictResponseError: "Failed to upload file!",
        dictCancelUpload: "Cancel File",
        dictCancelUploadConfirmation: "Are you sure you want to cancel the upload?",
        dictRemoveFile: "Remove File",
        dictMaxFilesExceeded: "You can upload only a maximum of {{maxFiles}} files",
    },

    MSG_NOT_FOUND: "MSG NOT FOUND",
    MSG_REGULAR_EXPRESSION_ERROR: "The input string does not match the regular expression",
    MSG_DATACONTEXT_KEY_DUPLICATE: "(DataContext key) is duplicate, please check.",

    //validator message
    InputValidator: {
      RequiredMessage: "The field is required.",
      LengthMessage: "The value must be more than {0} and less than {1} characters long",
      MinLengthMessage: "The value must be more than {0} characters long",
      MaxLengthMessage: "The value must be less than {0} characters long",
    },
    DigitValidator: {
      ValueMessage: "The value must be more than {0} and less than {1}",
      MinValueMessage: "The value must be more than {0}",
      MaxValueMessage: "The value must be less than {0}",
    },
    EmailValidator: "The input is not a valid email address",
    Page: {
        needContinue: "Need to continue?",
        messageFront: "Logout after ",
        messageEnd:" seconds.",
        confirm:"Confirm"
    },
    Required:"reuqired."
};
