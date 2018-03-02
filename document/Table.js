/**
 * @module Table 
 */

export default class Table{
    /** 
    * @description
    * <div class="exapmle" data-module="table" data-example='[{"basic":"250-700"},{"sort":"250-720"},{"detail":"1000-2580"},{"value":"460-970"},{"provider":"350-1090"},{"inline":"380-920"},{"edit":"500-1765"},{"function":"350-1140"},{"search":"280-710"},{"header":"300-750"}]'></div>
    * @property {object}  provider	                 - Defining the elements of the data source.
    * @property {boolean}  indexable                  - 	Defines whether an element is displayed sequence, the default is false.
    * @property {boolean}  detailable             - Defines whether an element is displayed folding information, the default is false.
    * @property {string}  detailSecquence             - Defines whether an element is displayed folding information location, the default is last column.
    * @property {boolean} sortable                - 	Defines whether an element is displayed sort, the default is false.
    * @property {boolean}  pageable              - 	Defines whether an element is displayed paging, the default is true.
    * @property {boolean}  searchable              - 	Defines whether an element is displayed search box, the default is false.
    * @property {function}  functions              - Defines 	Content displayed in the table functional areas.
    * @property {function}  rowDetailCallBack              - Defines when rowdetail show or colse call function.
    * @property {array}  detailDisVisible              - Defines when rowdetail not show .
    */
    example(){
        
    }
};