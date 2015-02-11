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