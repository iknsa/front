/*! ks-framework - v0.0.0 - 2015-02-02
* Copyright (c) 2015 ; Licensed  */
jQuery( document ).ready(function( $ ) {
if(!$('.btn-disable').attr('disabled') || 
    typeof $('.btn-disable').attr('disabled') == typeof undefined)
{
    $('.btn-disable').attr('disabled', true);

    $('.btn-disable').click(function(e) {
        e.preventDefault();
    });
}


});