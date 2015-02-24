/*! ks-framework - v0.0.0 - 2015-02-19
* Copyright (c) 2015 ; Licensed  */
function ks_strategy_firstCapital(param, elementObject)
{
    // console.log(elementObject);
    // add disable class on last child of the breadcrumb
    $('.breadcrumb ul li:last-child a').addClass("btn-disable").css("cursor", "initial");

    $('.breadcrumb ul li a').each(function(){

        $(this).text(firstCapital($(this).text()));
    });
}

/**
 * Makes the first char a capital
 * @param  {string} string
 * @return {string}
 */
function firstCapital(string)
{
    // Converts for each string the first char to UpperCase where string.slice(1) is the remainder of string
    return string && string[0].toUpperCase() + string.slice(1);
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