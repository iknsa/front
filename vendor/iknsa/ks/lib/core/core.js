// Core.js ------------------------------------------

/**
 * Init function. Calls each function in appropriate order
 * 
 * @param  {string} selector           selector => #id | .class
 * @param  {array} actionRules
 */
function init(selector, actionRules)
{
    if($(selector).length > 0) {
        
        var classes = {};

        getClasses(selector);
        getProperties(selector);
        classesToCheck(selectorClasses, actionRules);
        propToCheck(selectorProp, actionRules);
        combineValues(classesValuesToCheck, propValuesToCheck);
        callStrategies(allValues, getElementObject(selector));
    }
}

/**
 * Call the appropriate strategy
 * 
 * @param  {string} value
 * @param  {string} param
 */
function dispatchToStrategy(value, param, elementObject)
{
    strategy = "ks_strategy_" + value;

    window[strategy](param, elementObject);
}

/**
 * compare values from classes and properties with action rules
 *
 * @param {array} allValues
 * @param {array} actionRules
 */
function callStrategies(allValues, elementObject)
{
    $.each(allValues, function(index, value) {
        // Check that the value IS in the actionRules and IS NOT already in the validStrategy
        if($.isArray(value) === false) {
            if(!value.match(/\-/)) {
                dispatchToStrategy(value, true, elementObject);
            } else {
                splitVal = value.split("-");
                if(splitVal[1] !== null && splitVal[1] !== undefined && splitVal[1] !== "") {
                    dispatchToStrategy(splitVal[0], splitVal[1], elementObject);
                } else {
                    dispatchToStrategy(splitVal[0], true, elementObject);
                }
            }
        } else {        
            if(!value[0].match(/\-/)) {
                dispatchToStrategy(value[0], value[1], elementObject);
            } else {
                splitVal = value.split("-");
                if(splitVal[1] !== null && splitVal[1] !== undefined && splitVal[1] !== "") {
                    dispatchToStrategy(splitVal[0], splitVal[1], elementObject);
                } else {
                    dispatchToStrategy(splitVal[0], true, elementObject);
                }
            }
        }
    });
}

/**
 * Get the element object so as to use it if necessary
 * @param  {strint} selector
 * @return {object}
 */
function getElementObject(selector)
{
    return $(selector);
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
 * check if a value is in the action rules
 * 
 * @param  {string} value
 * @param  {array} actionRules
 * 
 * @return {boolean}
 */
function checkIfValueInActionRules(value, actionRules)
{
    if($.inArray(value, actionRules) !== -1 ){
        return true;
    }
}

/**
 * Prepare classes values to check if they are in the action Rules
 *
 * @param {array} selectorclasses
 *
 * return {array} classesValuesToCheck
 */
function classesToCheck(selectorClasses, actionRules)
{
    classesValuesToCheck = [];
    $.each(selectorClasses, function(index, value) {

        if(value.match(/-/)){

            splitVal = value.split("-");

            // If the class value is in the rules we also take the whole stuff as 
            // we will need it later on to send it as param to action strategies

            if(checkIfValueInActionRules(splitVal[0], actionRules)){
                classesValuesToCheck.push(splitVal);
            }

        } else {
            if(checkIfValueInActionRules(value, actionRules)) {
                classesValuesToCheck.push(value);
            }
        }
    });
    return classesValuesToCheck;
}

/**
 * Get all the classes of a specific selector
 * 
 * @param {string} selector => selector #id or .class
 *
 * return {array} selectorClasses
 */
function getClasses(selector)
{
    selectorClasses = $.makeArray($(selector).prop('class').split(" "));

    return selectorClasses;
}

/**
 * Prepare properties values to check if they are in the action Rules
 *
 * @param {array} selectorProp
 *
 * return {array} propValuesToCheck
 */
function propToCheck(selectorProp, actionRules)
{
    propValuesToCheck = [];
    propArray = [];

    $.each(selectorProp, function(index, value) {
        $.each(value, function(key, val){
            if(checkIfValueInActionRules(key, actionRules))
            {
                propValuesToCheck.push(key + "-" + val);
            }
        });
    });
    return propValuesToCheck;
}

/**
 * Get all the properties of a specific selector
 * 
 * @param {string} selector => selector #id or .class
 *
 * return {array} selectorProp
 */
function getProperties(selector)
{
    // var selectorAttr = $(selector).attr();
    selectorProp = [];
    prop = {};

    $(selector).each(function() {
        $.each(this.attributes, function() {
            if(this.specified) {

                // we take in all the properties except the class 
                if(this.name !== "class") {
                    prop[this.name] = this.value;
                }

                if($.inArray(prop, selectorProp)){
                    selectorProp.push(prop);
                }
            }
        });
    });
    return selectorProp;
}