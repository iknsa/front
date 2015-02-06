// If an li contains a hidden ul which has a class openable
// it will slide down the angular
$("li").has($("ul:hidden")).has($("ul.openable")).hover(
    function(){
        $(this).children("ul").stop().slideDown(200).addClass("active");
    }, function() {
        $(this).children("ul").stop().slideUp(200).removeClass("active");
    }
);
