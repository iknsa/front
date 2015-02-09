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