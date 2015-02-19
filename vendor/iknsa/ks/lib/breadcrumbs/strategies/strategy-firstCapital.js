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