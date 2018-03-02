export default class PageFooter extends React.Component {

    render() {
        // const myDate = new Date();
        // const tip = [];
        // let _config = Util.getJSON("package.json");
        //
        // if (_config != null) {
        //     tip.push("<table>");
        //     if (_config["serviceDependencies"]) {
        //         for (let key in _config.serviceDependencies) {
        //             const dependenciesVersion = _config.dependencies[key];
        //             const serviceDependenciesVersion = _config.serviceDependencies[key];
        //             const _version = dependenciesVersion == null ? serviceDependenciesVersion : dependenciesVersion;
        //             tip.push("<tr>");
        //             tip.push("<td>" + key + "</td>");
        //             tip.push("<td style='padding-left:15px'>" + _version + "</td>");
        //             tip.push("</tr>");
        //         }
        //     }
        //     tip.push("</table>");
        // } else {
        //     _config = {"version": "0.0.0"}
        // }
        //
        //
        // return (
        //     <div className="pagefooter">
        //         <a href="javascript:void(0)" className="tooltip-footer" style={{color:"gray", cursor: "pointer"}}
        //            data-placement="top" data-toggle="tooltip" data-html="true" data-original-title={tip.join("")}>
        //             Version:{_config.versionDescription == undefined ? _config.version : _config.versionDescription}
        //         </a>
        //         <span>  Copyright © {myDate.getFullYear()} eBaoTech Corporation. All rights reserved.</span>
        //     </div>
        // );

        return (
            <div className="pagefooter">
                <span>  Copyright © {new Date().getFullYear()} eBaoTech Corporation. All rights reserved.</span>
            </div>
        );
    }
}

/**@ignore
 * PageFooter component prop types
 */
PageFooter.propTypes = {};

/**@ignore
 * Get PageFooter component default props
 */
PageFooter.defaultProps = {};
