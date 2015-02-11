/*! ks-framework - v0.0.0 - 2015-02-10
* Copyright (c) 2015 ; Licensed  */
/*! ks-framework - v0.0.0 - 2015-02-10
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
// If an li has a class openable and contains a hidden ul
// it will slide down the hidden ul
// $("li.openable").has($("ul:hidden")).hover(
//     function(){
//         $(this).addClass("active").children("ul").stop().slideDown(200);
//     }, function() {
//         $(this).removeClass("active").children("ul").stop().slideUp(200);
//     }
// );



// Should dev something to know at which level we are in the list

// Factory for openable lists on event

// $(".openable").click(function(e){
//     e.preventDefault();
//     if($(this).children(":hidden")) {

//         // We close the siblings of the element 
//         $(this).siblings().removeClass("active").children(".open").stop().slideUp(200);

//         // We open the hidden list and rename the clases
//         $(this).removeClass("openable").addClass("closable active").children(":hidden").addClass("open").stop()
//             .slideDown(200);

//         // Rotate/Change the arrow icon
//         // $(".closable.active > a .icon-circle-up").css('transform', 'rotate(180deg)');
//         $(".closable.active > a .icon-circle-up").removeClass("icon-circle-up").addClass("icon-circle-down");
//     }
// });

// Open hidden children on click and close any siblings


$(".openable").click(function(e){
    e.preventDefault();

    if($(this).children(":hidden")) {
        $(this).removeClass("openable").addClass("closable active").children(":hidden").addClass("open").stop().slideDown(200);

        $(this).siblings().children(".open").stop().slideUp(200);

        // closable();
    }
    $(".closable").click(function(e){
        e.preventDefault();

        $(this).removeClass("closable active").addClass("openable").children(".open").removeClass(".open");

        console.log("what");
        // $(this).children(".open").stop().slideUp(200);
    });
});
// bind event on change on child class
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

//-------------------
}); //End of onload jQuery
//-------------------
/*! ks-framework - v0.0.0 - 2015-02-10
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
                   "email", "digits", "currency", "date", "time"];
// init('#search', actionRules);

//-------------------
// Core.js ------------------------------------------

/**
 * Init function. Calls each function in appropriate order
 * 
 * @param  {string} selector           selector => #id | .class
 * @param  {array} actionRules
 */
function init(selector, actionRules)
{
    var classes = {};

    getClasses(selector);
    getProperties(selector);
    classesToCheck(selectorClasses, actionRules);
    propToCheck(selectorProp, actionRules);
    combineValues(classesValuesToCheck, propValuesToCheck);
    callStrategies(allValues);
}

/**
 * Call the appropriate strategy
 * 
 * @param  {string} value
 * @param  {string} param
 */
function dispatchToStrategy(value, param)
{
    strategy = "ks_strategy_" + value;
    window[strategy](param);
}

/**
 * compare values from classes and properties with action rules
 *
 * @param {array} allValues
 * @param {array} actionRules
 */
function callStrategies(allValues)
{
    $.each(allValues, function(index, value) {
        // Check that the value IS in the actionRules and IS NOT already in the validStrategy
        if($.isArray(value) === false) {
            if(!value.match(/\-/)) {
                dispatchToStrategy(value, true);
            } else {
                splitVal = value.split("-");
                if(splitVal[1] !== null && splitVal[1] !== undefined && splitVal[1] !== "") {
                    dispatchToStrategy(splitVal[0], splitVal[1]);
                } else {
                    dispatchToStrategy(splitVal[0], true);
                }
            }
        } else {        
            if(!value[0].match(/\-/)) {
                dispatchToStrategy(value[0], value[1]);
            } else {
                splitVal = value.split("-");
                if(splitVal[1] !== null && splitVal[1] !== undefined && splitVal[1] !== "") {
                    dispatchToStrategy(splitVal[0], splitVal[1]);
                } else {
                    dispatchToStrategy(splitVal[0], true);
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
/*! ks-framework - v0.0.0 - 2015-02-10
* Copyright (c) 2015 ; Licensed  */
// _strategy_max.js ------------------------------------------
function ks_strategy_max(param)
{
    console.log("max: " + param);
}

//-------------------
// _strategy-maxlength.js ------------------------------------------
function ks_strategy_maxlength(param)
{
    console.log("maxlength: " + param);
}
//-------------------
// _strategy-min.js ------------------------------------------
function ks_strategy_min(param)
{
    console.log("min: " + param);
}

//-------------------
// _strategy-required.js ------------------------------------------
function ks_strategy_required(param)
{
    console.log("required: " + param);
}
