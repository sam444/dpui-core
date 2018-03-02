import Component from "../basic/Component";
import Param from '../basic/Param';
import {Util} from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Download extends Component {

    render() {
        if (this.props.ifLocalUrl != null && this.props.ifLocalUrl == "true") {
            return (
                <a id={this.componentId} href="javascript:void(0);"
                   onClick={this.handlerUrlOnClick.bind(this)} disabled={this.props.disabled}
                   style={this.props.style != null && this.props.style != undefined ? this.props.style : null}
                   className={this.getDisabled()}>
                    {this.renderLinkIcon()}
                    {this.getI18n(this.props.value)}
                </a>
            );
        } else {
            return (
                <a id={this.componentId} href="javascript:void(0);"
                   onClick={this.handlerOnClick.bind(this)} disabled={this.props.disabled}
                   style={this.props.style != null && this.props.style != undefined ? this.props.style : null}
                   className={this.getDisabled()}>
                    {this.renderLinkIcon()}
                    {this.getI18n(this.props.value)}
                </a>
            );
        }
    }

    renderLinkIcon() {
        if (this.props.icon != null && this.props.icon != undefined) {
            return (<span className={this.props.icon} style={{paddingRight: '5px'}}/>);
        }
        return <noscript/>;
    }

    getDisabled() {
        if (Util.parseBool(this.props.disabled)) {
            return "disabled";
        }
        return "";
    }

    handlerOnClick(event) {
        event.preventDefault();
        AjaxUtil.show();
        if (this.getDisabled() == "disabled") {
            return;
        }

        let setionToken = sessionStorage.getItem("Authorization");
        if (setionToken == null) {
            logout();
        }

        let suffixUrl = this.props.url;
        let type = this.props.type;
        let suffixFilename = this.props.filename;
        if (suffixFilename != null && suffixFilename != undefined) {
            if (suffixUrl.indexOf("?") > -1) {
                suffixUrl = suffixUrl + "&fileName=" + encodeURIComponent(suffixFilename);
            } else {
                suffixUrl = suffixUrl + "?fileName=" + encodeURIComponent(suffixFilename);
            }
        }

        let xhr = new XMLHttpRequest();
        xhr.open(type, suffixUrl, true);
        if (setionToken) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + sessionStorage.getItem("Authorization").substr(13).split("&")[0]);
        }
        // xhr.setRequestHeader("Access-Control-Allow-Origin",'*');
        // xhr.setRequestHeader("Access-Control-Allow-Methods",'*');
        // xhr.setRequestHeader("Access-Control-Allow-Headers",'x-requested-with,content-type,Content-Disposition');

        xhr.responseType = "blob";
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                // var fileName = this.getResponseHeader('Content-Disposition').split("=")[1];
                // if (fileName != null) {
                //     var nameStr = fileName.split('"');
                //     if (nameStr != null && nameStr.length == 3) {
                //         fileName = nameStr[1];
                //     }
                // }

                var blob = new Blob([this.response], {type: this.getResponseHeader('content-type')});

                if (!!window.ActiveXObject || "ActiveXObject" in window) {
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = suffixFilename==null?"DefaultFileName":suffixFilename;
                    link.click();
                }
                AjaxUtil.hide();
            }
        };
        
        if(type=="POST"&&this.props.param){
            const data = new FormData();
            _.keys(this.props.param,(key)=>{
                data.append(key,this.props.param[key]);
            })
            xhr.send(data);
        }else{
            xhr.send(null);
        }         
    }

    handlerUrlOnClick(event) {
        event.preventDefault();

        if (this.getDisabled() == "disabled") {
            return;
        }

        window.open (this.getURL(),'_parent');

        if (this.props.onClick != undefined) {
            this.props.onClick(new OnClickEvent(Param.getParameter(this)));
        }
    }
};


/**@ignore
 * Download component prop types
 */
Download.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    url: PropTypes.string,
    style: PropTypes.string,
    icon: PropTypes.string,
    filename: PropTypes.string,
    ifLocalUrl: PropTypes.string,
    type: PropTypes.string,
    param:PropTypes.object
};

/**@ignore
 * Get Download component default props
 */
Download.defaultProps = {
    icon: "fa fa-download",
    type: "GET"
};
