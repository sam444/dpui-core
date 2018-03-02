import OnEvent from "./OnEvent";

export default class OnRowSelectEvent extends OnEvent {

    constructor(component, jsEvent, paramJson, selectRecord) {
        super(component, jsEvent, paramJson);

        this.selectRecord = selectRecord;
    }

    getSelectRecord() {
        return this.selectRecord;
    }

}
