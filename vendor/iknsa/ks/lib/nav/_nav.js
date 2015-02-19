$("nav ul li > ul").css("display", "none");

$("nav ul li").each(function(){
    $(this).on("click", function(e) {
        console.log($(this));
        if($(this).children().is(":hidden")) {
            e.preventDefault();
            $(this).children("ul:hidden").stop().slideDown(200);
        } else {
            // console.log($(">ul", this));
            $(">ul", this).stop().slideUp(200);
        }
    });
});