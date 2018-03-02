import Component from "../basic/Component";
import ConfirmDialog from "../dialog/ConfirmDialog";
import r18n from '../i18n/reactjs-tag.i18n';
import Form from "../basic/Form";
import config from "config";
import { PageContext, ValidatorContext, ComponentContext, SessionContext } from 'rainbow-foundation-cache';
import UniqueId from '../basic/UniqueId';
import { Util } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';
import { CodeTableService } from "rainbow-foundation-codetable";
export default class Page extends Component {

    constructor(props) {
        super(props);
        this.loginTimer = null;
        this.loginTimeOut = null;
        this.countDownTimer = null;
        this.hasPopuped = false;
        this.secondCount = 0;
        this.countdownLimit = 5;
    }

    render() {
        return (
            <div className={this.props.className}>
                <div id="exception_container"></div>
                <Form id="registerForm">{this.renderPage()}</Form>
                <ConfirmDialog id="login_confirm_dialog" title={r18n.Page.needContinue}
                    message={r18n.Page.messageFront + (this.countdownLimit * 60) + r18n.Page.messageEnd}
                    confirmText={r18n.Page.confirm} cancelButton="false" closeable="false"
                    onConfirm={this.onClickConfirm.bind(this)} />
                {this.renderPageFooter()}
            </div>
        );
    }

    /**@ignore
     * Render page footer
     */
    renderPageFooter() {
        let PageFooter = config.DEFAULT_CLASS.PAGE_FOOTER;

        if (PageFooter && Util.parseBool(this.props.showPageFooter)) {
            return (<PageFooter />);
        }
    }

    /**@ignore
     * Render page
     */
    renderPage() {
        return this.props.children;
    }

    componentWillMount() {
        UniqueId.clearComponentId();
    }

    componentDidMount() {
        let _self = this;
        $("[data-toggle='tooltip']").tooltip();

        UniqueId.validateComponentId();

        if (Util.parseBool(config.DEFAULT_LOGOUT_IS_WORKING)) {
            this.setTimer(this);
            $("body").mousedown(function (event) {
                _self.setTimer(_self);
            });

            $("body").keypress(function (event) {
                _self.setTimer(_self);
            });
        }
        //$("#loadings").hide();
        const app = $("#app");
        // app.unbind('DOMSubtreeModified');
        //
        //
        // app.bind('DOMSubtreeModified', function(e) {
        //     const appDivHight = $("#app").height();
        //     const screenHight = $(window).height();
        //     if(screenHight-appDivHight>0){
        //         $(".pagefooter").addClass("fixed-bottom");
        //     }else{
        //         $(".pagefooter").removeClass("fixed-bottom");
        //     }
        // });

        //add onfocus style for some input conponent start
        $(".input-group > input.form-control").focus(function () {

            $(this).parent('.input-group').addClass('focusborder')

        })
        $(".input-group > input.form-control").blur(function () {

            $(this).parent('.input-group').removeClass('focusborder')

        })
        //add onfocus style for some input conponent end
        //CodeTableService.handleCodetableList();
        _self.escCloseDialog();
    }



    componentDidUpdate() {
        $("[data-toggle='tooltip']").tooltip();

        if (Util.parseBool(config.DEFAULT_LOGOUT_IS_WORKING)) {
            this.setTimer(this);
        }

    }

    componentWillUnmount() {
        PageContext.clear();
        ValidatorContext.clear();
        ComponentContext.clear();
        $("#loadings").show();
    }

    onClickConfirm() {
        ConfirmDialog.hide("login_confirm_dialog");
        this.hasPopuped = false;
        this.setTimer(this);
    }

    setTimer(_self) {
        let logoutLimit = Number(config.DEFAULT_LOGOUT_TIME_MINUTES);

        if (!_self.hasPopuped) {
            window.clearInterval(_self.loginTimer);
            window.clearTimeout(_self.loginTimeOut);
            _self.loginTimer = setInterval(function () {
                _self.hasPopuped = true;
                ConfirmDialog.show("login_confirm_dialog");

                if (Util.parseBool(config.DEFAULT_COUNTDOWN_IS_WORKING)) {
                    _self.secondCount = 0;
                    window.clearInterval(_self.countDownTimer);
                    _self.countDownTimer = window.setInterval(function () {
                        _self.secondCount++;
                        let info = r18n.Page.messageFront +
                            (_self.countdownLimit * 60 - _self.secondCount) + r18n.Page.messageEnd;
                        $("#login_confirm_dialog_msg").text(info);
                    }, 1000);
                }

                _self.loginTimeOut = window.setTimeout(function () {
                    window.logout();
                }, _self.countdownLimit * 60 * 1000);
            }, (logoutLimit - _self.countdownLimit) * 60 * 1000);
        }
    }

    escCloseDialog() {
        if (config.DOES_ESC_CLOSE_DIALOG) {
            $(document).keydown(function (event) {
                if (event.keyCode == "27") {
                    let body = $(document.body).eq(0);
                    if (body.hasClass("modal-open")) {
                        body.removeClass("modal-open");
                        body.css("overflow", "auto");
                    }
                    if (body.hasClass("modal-open-self")) {
                        body.removeClass("modal-open-self");
                        body.css("overflow", "auto");
                    }
                }
            });
        }
    }
};

/**@ignore
 * Page component prop types
 */
Page.propTypes = {
    pageName: PropTypes.string,
    className: PropTypes.string,
    skin: PropTypes.string,
    showPageFooter: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

/**@ignore
 * Get Page component default props
 */
Page.defaultProps = {
    showPageFooter: true
};
