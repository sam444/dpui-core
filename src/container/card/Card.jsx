import Component from '../../basic/Component';
import Cell from '../Cell';
import OnClickEvent from '../../event/OnClickEvent';
import Param from "../../basic/Param";
import { Util, ELUtil } from 'rainbow-foundation-tools';
import PropTypes from 'prop-types';

export default class Card extends Component {
    renderComponent() {
        let tempClass = this.props.className + ' card';
        const { children, enabled, outline, styleClass, title, style ,titleContent} = this.props;

        if (!Util.parseBool(enabled)) {
            this.recursChildren(children);
        }

        if (outline) {
            tempClass += ' card-outline-' + outline;
        }
        if (styleClass && styleClass != 'default') {
            tempClass += ' card-inverse card-' + styleClass;
        }

        return (
            <div className={tempClass} style={style}>
                {title ? this.renderHeader() : null}
                {this.renderImage()}
                {this.renderBlock()}
                {this.renderFooter()}
            </div>
        );
    }

    renderHeader() {
        const { title, functions, subTitle, titleContent} = this.props;

        return (
            <div className="card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className='cardHeaderFunction'>
                        {this.renderCardTitle()}
                        {this.props.titleFunctions ? this.props.titleFunctions : <noscript />}
                    </div>
                    <div className="cardHeaderContentFunction">
                        <div className="cardContentFunction">
                            {this.renderCardTitleContent()}
                        </div>
                        <div className='cardFunction'>
                            {functions}
                            {this.renderCollapse()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCardTitle() {
        if (Util.isObject(this.props.title)) {
            return (
                <span>{this.props.title}</span>
            );
        } else {
            return (
                <h4 className="card-title">{this.getI18n(this.getProperty("title"))}</h4>
            )
        }
    }
    renderCardTitleContent(){
        if (Util.isObject(this.props.titleContent)) {
            return (
                <span>{this.props.titleContent}</span>
            );
        } else {
            return (
                <span>{this.getI18n(this.getProperty("titleContent"))}</span>
            )
        }
    }
   

    renderImage() {
        const { imageSrc } = this.props;

        return (
            imageSrc ?
                <img className="card-img-top" width="100%" src={imageSrc} /> :
                null
        );
    }

    renderBlock() {
        const { collapse, children } = this.props;

        return (
            <div className={Util.parseBool(collapse) ? 'card-block collapse show' : 'card-block collapse'} id={this.componentId}>
                {children}
            </div>
        );
    }

    renderCollapse() {
        const { collapseIcon } = this.props;

        return (
            Util.parseBool(collapseIcon) ?
                <a data-toggle="collapse" href={"#" + this.componentId} aria-expanded="false" aria-controls={this.componentId}>
                    <span className="glyphicon glyphicon-chevron-down" onClick={this.onClick.bind(this)}></span>
                </a> :
                null
        );
    }
    onClick(event) {
        event.preventDefault();
        let clickEvent = new OnClickEvent(this, event, Param.getParameter(this));
        if (this.props.onClick) {
            this.props.onClick(new OnClickEvent(this, event, Param.getParameter(this)));
        }
    }
    renderFooter() {
        const { footer } = this.props;

        return (
            footer ?
                <div className="card-footer">
                    <small className="text-muted">{footer}</small>
                </div> :
                null
        );
    }

    recursChildren(children) {
        if (children) {
            React.Children.forEach(children, item => {
                if (item.props.enabled !== 'true' && item.props.enabled !== true) {
                    item.props.enabled = 'false';
                }
                this.recursChildren(item.props.children);
            });
        }
    }
}

/**@ignore
 * Panel component prop types
 */
Card.propTypes = $.extend({}, Component.propTypes, {
    enabled: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    outline: PropTypes.oneOf(["none", "default", "primary", "success", "warning", "danger", "info"]),
    footer: PropTypes.string,
    imageSrc: PropTypes.string,
    title: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    titleContent: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    subTitle: PropTypes.string,
    functions: PropTypes.func,
    titleFunctions: PropTypes.func,
    collapse: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    collapseIcon: PropTypes.oneOf([PropTypes.string, PropTypes.bool]),
    width: PropTypes.oneOf([PropTypes.string, PropTypes.number])
});

/**@ignore
 * Get dynamicSection component default props
 */
Card.defaultProps = $.extend({}, Component.defaultProps, {
    styleClass: '',
    className: '',
    outline: 'default',
    collapse: 'true',
    collapseIcon: 'true'
});