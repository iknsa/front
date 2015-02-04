/*! ks-framework - v0.0.0 - 2015-02-04
* Copyright (c) 2015 ; Licensed  */
jQuery( document ).ready(function( $ ) {
//-------------------

//-------------------
// Breadcrumb
// add disable class on last child of the breadcrumb
$('.breadcrumb ul li:last-child a').addClass("btn-disable");
//-------------------
// Buttons
// prevent default action on disabled btn elements
if(!$('.btn-disable').attr('disabled') || 
    typeof $('.btn-disable').attr('disabled') == typeof undefined)
{
    $('.btn-disable').attr('disabled', true);

    $('.btn-disable').click(function(e) {
        e.preventDefault();
    });
}
//-------------------

//-------------------
// Forms

// Disable browser default validation
$("form").attr('novalidate', "");

// Forms Errors

validaionRules = ["max", "min", "required", "email", "digits", "currency", "date", "time"];

validateField('#search', validaionRules);


function validateField(field, validaionRules)
{
    var classes = {};
    var fieldParent = $(field).parent(".form-group");

    getClasses(field);
    getProperties(field);
    classesToCheck(fieldClasses);
    propToCheck(fieldProp);
    valuesToCompareWithValidationRules(classesValuesToCheck, propValuesToCheck)
    compareValuesWithRules(allValues, validaionRules);
    dispatchRuleToStrategy(strategies);
}


/*function dispatchRuleToStrategy(strategies)
{
    console.log(strategies);
    $.each(strategies, function(index, value) {
        strategy = "strategy_" + value;
        [strategy]();
    });
}*/

function dispatchRuleToStrategy(strategies)
{
    // console.log(strategies);
    $.each(strategies, function(index, value) {
    });
    var lib = {
        'strategy_min': strategy_min
    };
    lib['strategy_min']();
}

function strategy_min()
{
    console.log("ok min");
}

function strategy_required()
{
    console.log("ok required");
}

// function

/**
 * compare values from classes and properties with validation rules
 *
 * @param {array} allValues
 * @param {array} validationRules
 *
 * @return {array} strategies
 */
function compareValuesWithRules(allValues, validaionRules)
{
    strategies = [];
    $.each(allValues, function(index, value) {
        // Check that the value IS in the validationRules and IS NOT already in the validStrategy
        if($.inArray(value, validaionRules) != -1 && $.inArray(value, strategies) == -1){
            strategies.push(value);
        }
    });

    return strategies;
}

/**
 * Put all values from classes and properties in one single array
 * 
 * @param  {array} classesValuesToCheck
 * @param  {array} propValuesToCheck
 * 
 * @return {array} allValues
 */
function valuesToCompareWithValidationRules(classesValuesToCheck, propValuesToCheck)
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
 * Prepare classes values to check if they are in the validation Rules
 *
 * @param {array} fieldclasses
 *
 * return {array} classesValuesToCheck
 */
function classesToCheck(fieldClasses)
{
    classesValuesToCheck = [];
    $.each(fieldClasses, function(index, value) {
        if(value.match(/-/)){
            splitVal = value.split("-");
            classesValuesToCheck.push(splitVal[0]);
        } else {
            classesValuesToCheck.push(value);
        }
    });
    return classesValuesToCheck;
}

/**
 * Prepare properties values to check if they are in the validation Rules
 *
 * @param {array} fieldProp
 *
 * return {array} propValuesToCheck
 */
function propToCheck(fieldProp)
{
    propValuesToCheck = [];
    $.each(fieldProp, function(index, value) {
        if(value.match(/-/)){
            splitVal = value.split("-");
            propValuesToCheck.push(splitVal[0]);
        } else {
            propValuesToCheck.push(value);
        }
    });
    return propValuesToCheck;
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

    var fieldVal = $(field).val();
        $(field).each(function() {
        $.each(this.attributes, function() {
            if(this.specified) {
                fieldProp.push(this.name);
            }
        });
    });

    return fieldProp;
}
//-------------------

//-------------------
});