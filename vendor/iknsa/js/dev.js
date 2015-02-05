/*! ks-framework - v0.0.0 - 2015-02-05
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

validationRules = ["max", "min", "maxlength", "required", "email", "digits", "currency", "date", "time"];

validateField('#search', validationRules);


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
    dispatchRuleToStrategy(strategies);
}


function dispatchRuleToStrategy(strategies)
{
    // console.log(strategies);

    $.each(strategies, function(index, value) {
        strategy = "strategy_" + value;
        eval(strategy + "()");
        // console.log(strategy);
    });
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
function callStrategies(allValues)
{
    strategies = [];
    $.each(allValues, function(index, value) {
        // Check that the value IS in the validationRules and IS NOT already in the validStrategy
        if($.isArray(value) === false) {
            if(!value.match(/\-/)) {
                if($.inArray(value, strategies) == -1){
                    strategies.push(value);
                }
            }
        }
    });
console.log(strategies);
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
// console.log(allValues);
    return allValues;
}

/**
 * check if a value is in the validation rules
 * @param  {string} value
 * @param  {array} validationRules
 * 
 * @return {boolean}
 */
function checkIfValueInValidationRules(value, validationRules)
{
        // console.log(value);
    if($.inArray(value, validationRules) != -1 ){
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
        // console.log(value);
        $.each(value, function(key, val){
            // console.log(key+':'+val);
            if(checkIfValueInValidationRules(key, validationRules))
            {
                propValuesToCheck.push(key + "-" + val);
            }
        });
    });
    // console.log(propValuesToCheck);
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
                if(this.name != "class") {
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
//-------------------

//-------------------
});