/**
 * @module Text 
 */

export default class Text{
    /** 
    * @description
    * <div class="exapmle" data-module="text" data-example='[{"all":"570-1330"}]'></div>
    * @property {string}  label              - 	Defining the elements label.
    * @property {string}  io                 - Define the elements as input or output,option is in/out ,the default is 'in'.
    * @property {string}  helpText              - 	Define the elements with the help of the message.
    * @property {string}  widthAllocation              - Defining lable and input field proportion, divided into 12 parts, the default is '4,8'.
    * @property {boolean}  required              - Define the elements are required,the default is false.
    * @property {string}  requiredMessage              - Define the elements check the required message of the input value.
    * @property {boolean}  enabled              - Defines whether the element can be input,the default is true.
    * @property {boolean}  visibled              - 	Defines whether the element can be hidden,the default is true.
    * @property {string}  layout              - 	Defining the elements of the arrangement,the option is horizontal/vertical the default is horizontal.
    * @property {string}  placeHolder              - Define the elements input fields of expectations.
    * @property {function}  onChange		                 - 	Define the elements in the object changes trigger events.
    * @property {function}  onBlur		                 - 		Define the elements in the triggering event object loses focus.
    * @property {function}  onFocus		                 - 		Define the elements in the object gains focus when the triggering event.
    * @property {string}  defaultValue              - 	Define the elements of the default values.
    * @property {string}  validationGroup              - Defines a set of elements for the validation specified, between groups can be separated by a comma.
    * @property {string}  mask              - 		Define the elements cover index,if it is “#:(3,7)”,the results for 123####8888.“:”before the arbitrary symbols can substitute for cover character,“()” fill in the index.if it is “#:(7)”,the results for 1236666####.if it is “*：(-1)”,the results for 1**********.
    * @property {string}  suffixIcon              - 	Define element suffix icon.
    * @property {function}  onSuffixIconClick              - 	Define the elements click suffix icon when the trigger event.
    * @property {string}  suffixText              - 	Define element suffix text.
    * @property {string}  prefixIcon              - 	Define element prefix icon.
    * @property {function}  onPrefixIconClick              - 	Define the elements click prefix icon when the trigger event.
    * @property {dtring}  prefixText              - 	Define element prefix text.
    * @property {string}  allowChars              - Define the elements of the input format.
    * @property {string}  pattern              - 	Define the elements of the input value with a certain pattern matching work.
    * @property {string}  toUpperLowerCase              - 	Define the elements input values into uppercase or lowercase the option is upper/lower.
    * @property {number}  maxLength              - 	Define the elements check the maximum length of the input value.
    * @property {number}  minLength              - 	Define the elements validation minimum length of the input value.
    * @property {string}  maxLengthMessage              - 	Define the elements checking the input value is greater than the maximum length of message.
    * @property {string}  minLengthMessage              - 	Define the elements checking the input value is less than the minimum length of message.
    */
    example(){
        
    }
};