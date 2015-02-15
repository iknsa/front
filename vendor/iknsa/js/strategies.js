/*! ks-framework - v0.0.0 - 2015-02-15
* Copyright (c) 2015 ; Licensed  */
function ks_strategy_firstCapital(param, elementObject)
{
    console.log(elementObject);
}
//-------------------
// _strategy_max.js ------------------------------------------
function ks_strategy_max(param, elementObject)
{
    console.log(elementObject);
}

//-------------------
// _strategy-maxlength.js ------------------------------------------
function ks_strategy_maxlength(param, elementObject)
{
    console.log("maxlength: " + param);
}
//-------------------
// _strategy-min.js ------------------------------------------
function ks_strategy_min(param, elementObject)
{
    console.log("min: " + param);
}

//-------------------
// _strategy-required.js ------------------------------------------
function ks_strategy_required(param, elementObject)
{
    console.log("required: " + param);
}

//-------------------
// Toggle slideup and down strategy for classes .openable


// selector on which the event happens
// function ks_strategy_toggleSlide(param, elementObject) 
// {
//     $(elementObject).children(".toggle").css("display", "none");
//     $(elementObject).on("click", function(e){
//         $(this).children().toggle();
//     });

//     $(elementObject)
// }