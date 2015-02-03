/*! ks-framework - v0.0.0 - 2015-02-03
* Copyright (c) 2015 ; Licensed  */
jQuery( document ).ready(function( $ ) {

$('.breadcrumb ul li:last-child a').addClass("btn-disable")
if(!$('.btn-disable').attr('disabled') || 
    typeof $('.btn-disable').attr('disabled') == typeof undefined)
{
    $('.btn-disable').attr('disabled', true);

    $('.btn-disable').click(function(e) {
        e.preventDefault();
    });
}



});