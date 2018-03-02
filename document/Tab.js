/**
 * @module Tab 
 */

export default class Tab{
    /** 
    * @description
    * <div class="exapmle" data-module="tab" data-example='[{"style1":"220-440"},{"style2":"220-445"},{"eventTab":"220-700"},{"activityTab":"220-450"},{"disabledTab":"220-450"}]'></div>
    * @property {number}  activeIndex	                 - 	Defining the region activity index.
    * @property {string}  type                  - 	Defining the elements display style, the default is tabs. the option is tabs/pills.
    * @property {string}  onTabChange             - Defining the elements change the triggered event.
    * @property {function} onBeforeTabChange                - Define the elements change before the trigger event.
    * @property {function}  onAfterTabChange              - 	Define the elements change after the trigger event.
    * @property {function}  lazyLoad              - 	Define the way of load, Default true.
    * @property {string}  id              - React.PropTypes.string.
    * @property {string}  name              - React.PropTypes.string.
    * @property {string}  value              - Defines whether context of the element can be show,the default is true.
    * @property {object}  style              - Defines whether collapse icon of the element can be show,the default is false.
    * @property {string}  styleClass              - React.PropTypes.oneOf(["default", "primary", "success", "warning", "danger", "info"]).
    * @property {string}  className              -React.PropTypes.string.
    * @property {boolean}  enabled              - React.PropTypes.bool.
    * @property {boolean}  visiabled              - React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]).
    * @property {functions}  onClick              - React.PropTypes.func.
    * @property {string}  validationGroup              - Defines a set of elements for the validation specified, between groups can be separated by a comma.
    * @property {boolean}  causeValidation              - Defines whether an element is triggered for verification, the default is false.
    * @property {string}  exceptValidationGroup  -React.PropTypes.string.
    * @property {string}  icon	                 - 	React.PropTypes.string.
    * @property {string}  badge	                 - 	React.PropTypes.string.
    * @property {boolean}  enabled	                 -React.PropTypes.bool.
    */
    example(){
        
    }
}
