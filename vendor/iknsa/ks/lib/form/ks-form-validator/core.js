// Core.js ------------------------------------------

/**
 * Init function. Calls each function in appropriate order
 * 
 * @param  {string} field           selector => #id | .class
 * @param  {array} validationRules
 */
function validateField(field, validationRules)
{
    var classes = {};
    var fieldParent = $(field).parent(".form-group");

    getClasses(field);
    getProperties(field);
    classesToCheck(fieldClasses, validationRules);
    propToCheck(fieldProp, validationRules);
    combineValues(classesValuesToCheck, propValuesToCheck);
    callStrategies(allValues);
}

/**
 * Call the appropriate strategy
 * 
 * @param  {string} value
 * @param  {string} param
 */
function dispatchRuleToStrategy(value, param)
{
    strategy = "ks_strategy_" + value;
    window[strategy]();
}

/**
 * compare values from classes and properties with validation rules
 *
 * @param {array} allValues
 * @param {array} validationRules
 */
function callStrategies(allValues)
{
    $.each(allValues, function(index, value) {
        // Check that the value IS in the validationRules and IS NOT already in the validStrategy
        if($.isArray(value) === false) {
            if(!value.match(/\-/)) {
                dispatchRuleToStrategy(value, true);
            } else {
                splitVal = value.split("-");
                if(splitVal[1] !== null && splitVal[1] !== undefined && splitVal[1] !== "") {
                    dispatchRuleToStrategy(splitVal[0], splitVal[1]);
                } else {
                    dispatchRuleToStrategy(splitVal[0], true);
                }
            }
        } else {        
            if(!value[0].match(/\-/)) {
                dispatchRuleToStrategy(value[0], value[1]);
            } else {
                splitVal = value.split("-");
                if(splitVal[1] !== null && splitVal[1] !== undefined && splitVal[1] !== "") {
                    dispatchRuleToStrategy(splitVal[0], splitVal[1]);
                } else {
                    dispatchRuleToStrategy(splitVal[0], true);
                }
            }
        }
    });
}

/**
 * Put all values from classes and properties in one single array
 * 
 * @param  {array} classesValuesToCheck
 * @param  {array} propValuesToCheck
 * 
 * @return {array} allValues
 */
function combineValues(classesValuesToCheck, propValuesToCheck)
{
    allValues = [];

    // add class values to array which will be used to compare
    $.each(classesValuesToCheck, function(index, value) {
        allValues.push(value);
    });

    // add properties values to array which will be used to compare
    $.each(propValuesToCheck, function(index, value) {
        allValues.push(value);
    });
    return allValues;
}

/**
 * check if a value is in the validation rules
 * 
 * @param  {string} value
 * @param  {array} validationRules
 * 
 * @return {boolean}
 */
function checkIfValueInValidationRules(value, validationRules)
{
    if($.inArray(value, validationRules) !== -1 ){
        return true;
    }
}

/**
 * Prepare classes values to check if they are in the validation Rules
 *
 * @param {array} fieldclasses
 *
 * return {array} classesValuesToCheck
 */
function classesToCheck(fieldClasses, validationRules)
{
    classesValuesToCheck = [];
    $.each(fieldClasses, function(index, value) {

        if(value.match(/-/)){

            splitVal = value.split("-");

            // If the class value is in the rules we also take the whole stuff as 
            // we will need it later on to send it as param to validation strategies

            if(checkIfValueInValidationRules(splitVal[0], validationRules)){
                classesValuesToCheck.push(splitVal);
            }

        } else {
            if(checkIfValueInValidationRules(value, validationRules)) {
                classesValuesToCheck.push(value);
            }
        }
    });
    return classesValuesToCheck;
}

/**
 * Get all the classes of a specific field
 * 
 * @param {string} field => selector #id or .class
 *
 * return {array} fieldClasses
 */
function getClasses(field)
{
    fieldClasses = $.makeArray($(field).prop('class').split(" "));

    return fieldClasses;
}

/**
 * Prepare properties values to check if they are in the validation Rules
 *
 * @param {array} fieldProp
 *
 * return {array} propValuesToCheck
 */
function propToCheck(fieldProp, validationRules)
{
    propValuesToCheck = [];
    propArray = [];

    $.each(fieldProp, function(index, value) {
        $.each(value, function(key, val){
            if(checkIfValueInValidationRules(key, validationRules))
            {
                propValuesToCheck.push(key + "-" + val);
            }
        });
    });
    return propValuesToCheck;
}

/**
 * Get all the properties of a specific field
 * 
 * @param {string} field => selector #id or .class
 *
 * return {array} fieldProp
 */
function getProperties(field)
{
    // var fieldAttr = $(field).attr();
    fieldProp = [];
    prop = {};

    $(field).each(function() {
        $.each(this.attributes, function() {
            if(this.specified) {

                // we take in all the properties except the class 
                if(this.name !== "class") {
                    prop[this.name] = this.value;
                }

                if($.inArray(prop, fieldProp)){
                    fieldProp.push(prop);
                }
            }
        });
    });
    return fieldProp;
}