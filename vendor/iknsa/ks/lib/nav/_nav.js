$("li").has($("ul:hidden")).hover(
    function(){
        $(this).children("ul").stop().slideDown(400).addClass("active");
    }, function() {
        $(this).children("ul").stop().slideUp(200).removeClass("active");
    }
);
