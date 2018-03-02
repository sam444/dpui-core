import OnEvent from "./OnEvent";

export default class OnToggleEvent extends OnEvent {

    constructor(component, toggle) {
        super(component, null, null);

        this.toggle = toggle;
    }

    getToggle() {
        return this.toggle;
    }

};
