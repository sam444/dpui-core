import OnEvent from "./OnEvent";

export default class OnTabChangeEvent extends OnEvent {

    constructor(tab, tabItem, jsEvent, paramJson, newActiveIndex, oldActiveIndex) {
        super(tabItem, jsEvent, paramJson);

        this.newActiveIndex = newActiveIndex;
        this.tab = tab;
        this.oldActiveIndex = oldActiveIndex;
    }

    getTab() {
        return this.tab;
    }

    getNewActiveIndex() {
        return this.newActiveIndex;
    }

    getOldActiveIndex() {
        return this.oldActiveIndex;
    }

    toString() {
        return this.newActiveIndex + "/" + this.oldActiveIndex;
    }

}
