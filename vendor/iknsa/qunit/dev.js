/*! ks-framework - v0.0.0 - 2015-02-16
* Copyright (c) 2015 ; Licensed  */
/*! ks-framework - v0.0.0 - 2015-02-16
* Copyright (c) 2015 ; Licensed  */
jQuery( document ).ready(function( $ ) {
//-------------------

//-------------------
// Breadcrumb

// add disable class on last child of the breadcrumb
$('.breadcrumb ul li:last-child a').addClass("btn-disable");

$('.breadcrumb ul li a').each(function(){

    $(this).text(firstCapital($(this).text()));
});

function firstCapital(string)
{
    return string && string[0].toUpperCase() + string.slice(1);
}
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

//-------------------

//-------------------
// Forms
// Disable browser default validation
$("form").attr('novalidate', "");

// validateField('#search', validationRules);
//-------------------

//-------------------

//-------------------

//-------------------
// $('ul.toggle').css("display", "none");
// $('li.toggleSlide').on("click", function(e){
//     $('li.toggleSlide > ul').stop().toggle(200);
// });
//-------------------

//-------------------

//-------------------
}); //End of onload jQuery
//-------------------
/*! ks-framework - v0.0.0 - 2015-02-16
* Copyright (c) 2015 ; Licensed  */
// actionRules.js ------------------------------------------

// Required by the core.js to create rules. Each rule defined is
// checked by the core for constraints defined in the concerning
// field. Then the core dispatches each rule to the appropriate
// strategy. All strategies are functions whose name must follow
// the following format "ks_strategy_" + validationRule 
// 
// Each strategy is a plugin. Be sure to have the plugin in case
// of undefined function.

actionRules = ["max", "min", "maxlength", "required",
                   "email", "digits", "currency", "date", "time", "firstCapital", "toggleSlide"];
ks_init('#search', actionRules);
ks_init('.breadcrumb', actionRules);
ks_init('.toggleSlide', actionRules);

//-------------------
// Core.js ------------------------------------------

/**
 * Init function. Calls each function in appropriate order
 * 
 * @param  {string} selector           selector => #id | .class
 * @param  {array} actionRules
 */
function ks_init(selector, actionRules)
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
    console.log(allValues);
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
                    console.log(splitVal[1]);
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
//-------------------
/*! ks-framework - v0.0.0 - 2015-02-16
* Copyright (c) 2015 ; Licensed  */
function ks_strategy_firstCapital(param, elementObject)
{
    console.log(elementObject);
}
//-------------------
// _strategy_max.js ------------------------------------------
function ks_strategy_max(param, elementObject)
{
    // console.log(elementObject);
}

//-------------------
// _strategy-maxlength.js ------------------------------------------
function ks_strategy_maxlength(param, elementObject)
{
    // console.log("maxlength: " + param);
}
//-------------------
// _strategy-min.js ------------------------------------------
function ks_strategy_min(param, elementObject)
{
    // console.log("min: " + param);
}

//-------------------
// _strategy-required.js ------------------------------------------
function ks_strategy_required(param, elementObject)
{
    // console.log("required: " + param);
}

//-------------------
// Toggle slideup and down strategy for classes .openable


// selector on which the event happens
function ks_strategy_toggleSlide(param, elementObject) 
{
    //     $(elementObject).children(".toggle").css("display", "none");
    //     $.each(elementObject, function(index, value){
    // console.log(elementObject[index]);

    //         $(elementObject[index]).on("click", function(e){
    //             e.preventDefault();
    //             if($(elementObject[index]).children().next().is(":hidden")) {
    //                 $(elementObject[index]).children().next().addClass("active").slideDown();
    //             } else {
    //                 console.log(elementObject[index]);
    //                 $(elementObject[index]).children().next().removeClass("active").slideUp();
    //             }
    //         });

    //     }); //End of each loop

    // $(elementObject)
}