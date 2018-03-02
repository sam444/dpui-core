import { Util } from "rainbow-foundation-tools";
import Component from "../../basic/Component";
import PropTypes from 'prop-types';

export default class Wizard extends Component {

    /**@ignore
     * Get wizard
     */
    static getWizard(wizardId) {
        return $("#" + wizardId + "_hiddenBtn");
    }

    /**@ignore
     * Next
     */
    static next(wizardId) {
        this.getWizard(wizardId).trigger("click", { stepNumber: "next" });

        //document.getElementsByTagName('body')[0].scrollTop = 0;
        $("html, body").animate({ "scrollTop": 0 }, 100);
    }

    /**@ignore
     * Previous
     */
    static previous(wizardId) {
        this.getWizard(wizardId).trigger("click", { stepNumber: "previous" });

        $("html, body").animate({ "scrollTop": 0 }, 100);
    }

    /**@ignore
     * Skip to
     */
    static skipTo(wizardId, stepNum) {
        this.getWizard(wizardId).trigger("click", { stepNumber: stepNum });

        $("html, body").animate({ "scrollTop": 0 }, 100);
    }

    static getActiveIndex(wizardId) {
        let activeIndex = 0;
        $("#" + wizardId).find(".wizard-steps").find("div").map(function (index, element) {
            if ($(element).attr("class") == "active-step") {
                activeIndex = index + 1;
            }
        });
        return activeIndex;
    }

    constructor(props) {
        super(props);

        this.state = {
            stepNumber: null
        };
    }

    render() {
        return (
            <div id={this.props.id} className="defwizard" style={this.props.style}>
                {
                    this.props.styleClass == "default" ?
                        <div className="wizard-steps">{this.renderWizardArrowHeader()}</div> :
                        <ul className="wizard-circle">{this.renderWizardCircleHeader()}</ul>
                }
                <div style={{ clear: "both" }}></div>
                {this.renderWizardContent()}
                {this.renderWizardStepButton()}
            </div>
        );
    }


    renderWizardCircleHeader() {
        return React.Children.map(this.props.children, (child, index) => {
            return (
                <li className={this.state.stepNumber == index + 1 ? "current" : (this.state.stepNumber <= index ? 'notarrive' : '')}>
                    <span className="step">{this.getI18n(child.props.title)}</span>
                    <span className="title">{this.getI18n(child.props.title)}</span>
                </li>
            );
        });
    }

    renderWizardArrowHeader() {
        return React.Children.map(this.props.children, (child, index) => {
            return (
                <div className={(this.state.stepNumber == index + 1) ? "active-step" : (this.state.stepNumber <= index ? '' : 'completed-step')}>
                    <a href="javascript: void (0);"><span className="step">{child.props.stepName ? this.getI18n(child.props.stepName) : index + 1}</span>{this.getI18n(child.props.title)}</a>
                </div>
            );
        });
    }

    renderWizardContent() {
        return React.Children.map(this.props.children, (child, index) => {
            if (this.state.stepNumber == index + 1) {
                return (
                    <div id={"step-" + index} style={{ width: "100%", paddingTop: "15px" }}>
                        {child.props.children}
                    </div>
                );
            }
        });
    }

    renderWizardStepButton() {
        let wizardStepButton = null;

        if (Util.isFunction(this.props.wizardStepButton)) {
            wizardStepButton = this.props.wizardStepButton(this.state.stepNumber);
        } else if (this.props.wizardStepButton != null && this.state.stepNumber != null) {
            wizardStepButton = <this.props.wizardStepButton stepNumber={this.state.stepNumber} />;
        }

        return (
            <div>
                <button id={this.props.id + "_hiddenBtn"} type="button" style={{ display: "none" }} />
                {wizardStepButton}
            </div>
        );
    }

    componentWillMount() {
        if (this.props.activeIndex == null || this.props.activeIndex == undefined) {
            this.setState({ stepNumber: 1 });
        } else {
            this.setState({ stepNumber: this.getProperty("activeIndex") });
        }
    }

    componentDidMount() {
        $("#" + this.props.id + "_hiddenBtn").click((event, data) => {
            event.preventDefault();

            let stepNumber = data.stepNumber;
            if (stepNumber == "next") {
                this.setState({ stepNumber: parseInt(this.state.stepNumber) + 1 });
            }

            else if (stepNumber == "previous") {
                this.setState({ stepNumber: parseInt(this.state.stepNumber) - 1 });
            }

            else {
                this.setState({ stepNumber: stepNumber });
            }
        });
    }

};

/**
 * Wizard component prop types
 */
Wizard.propTypes = {
    id: PropTypes.string,
    activeIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wizardStepButton: PropTypes.object,
    style: PropTypes.string,
    styleClass: PropTypes.oneOf(["default", "circle"])
};

/**
 * Get wizard component default props
 */
Wizard.defaultProps = {
    style: {},
    activeIndex: 1,
    styleClass: "default"
};
