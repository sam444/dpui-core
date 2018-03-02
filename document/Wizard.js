/**
 * @module Wizard 
 */

export default class Wizard{
    /** 
    * @description
    * <div class="exapmle" data-module="wizard" data-example='[{"wizardStep":"180-760"},{"include":"350-3210"}]'></div>
    * @property {number}  activeIndex	                 - 	Defining the region activity index.
    * @property {function}  wizardStepButton                  - 	Defining the elements button.
    * @property {string}  title             - 	Define the elements title.
    * @property {function} next                - 	Define the elements to jump to the next activity area. 	UIWizard.next("id")
    * @property {function}  previous              - 		Define the elements on the jump to the previous activity area. UIWizard.previous("id")
    * @property {function}  skipTo              - Define the elements to jump to designated area. 	UIWizard.skipTo("id", index)
    * @property {string}  id              - React.PropTypes.string.
    * @property {string}  name              - React.PropTypes.string.
    * @property {string}  value              - Defines whether context of the element can be show,the default is true.
    * @property {object}  style              - Defines whether collapse icon of the element can be show,the default is false.
    * @property {string}  styleClass              - React.PropTypes.oneOf(["default", "primary", "success", "warning", "danger", "info"]).
    * @property {string}  className              -React.PropTypes.string.
    * @property {boolean}  enabled              - React.PropTypes.bool.
    * @property {boolean}  visiabled              - React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]).
    * @property {functions}  onClick              - React.PropTypes.func.
    */
    example(){
        
    }
};



