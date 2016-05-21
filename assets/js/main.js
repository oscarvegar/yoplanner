// main.JS
//--------------------------------------------------------------------------------------------------------------------------------
//This is JS file that contains principal fuctions of theme */
// -------------------------------------------------------------------------------------------------------------------------------
// Template Name: Travelia - Travel Theme And Hotel Online Booking.
// Author: Iwthemes.
// Name File: main.js
// Version 1.0 - Created on 26 May 2015
// Website: http://www.iwthemes.com 
// Email: support@iwthemes.com
// Copyright: (C) 2015

function parseDate(date){
  return moment(date, "YYYY-MM-DD").toDate();
}

$(document).ready(function($) {

	'use strict';

	

  //=================================== Sticky nav ===================================//

  $("#header").sticky({topSpacing:0});

  //=================================== datepicker ===================================//
  
  //=================================== Loader =====================================//
  jQuery(window).load(function() {
    jQuery(".status").fadeOut();
      jQuery(".preloader").delay(1000).fadeOut("slow");
  })

	//=================================== Carousel Services  ==============================//	 
	$("#single-carousel, #single-carousel-sidebar").owlCarousel({
		  items : 1,
		  autoPlay: 4000,  
    	navigation : true,
    	autoHeight : true,
    	slideSpeed : 400,
    	singleItem: true,
    	pagination : false
	});

  //=================================== Carousel features  ==================================//
  $("#slide-features").owlCarousel({
      autoPlay: false,
      items : 1,
      navigation : true,
      autoHeight : true,
      slideSpeed : 400,
      singleItem: true,
      pagination : true
  });

  //=================================== Carousel Boxes  ==================================//
   $("#boxes-carousel").owlCarousel({
       autoPlay: 3200,      
       items : 4,
       navigation: true,
       itemsDesktopSmall : [1024,3],
       itemsTablet : [768,2],
       itemsMobile : [500,1],
       pagination: false
   });

  //=================================== Carousel teams  ==================================//
   $("#team-carousel").owlCarousel({
       autoPlay: 3200,      
       items : 3,
       navigation: true,
       itemsDesktopSmall : [1024,3],
       itemsTablet : [768,2],
       itemsMobile : [500,1],
       pagination: false
   });

   $("#team-carousel-02, #carousel-boxes-2").owlCarousel({
       autoPlay: 3200,      
       items : 2,
       navigation: false,
       itemsDesktopSmall : [1024,3],
       itemsTablet : [768,2],
       itemsMobile : [500,1],
       pagination: false
   });

   //=================================== Carousel Sponsor  ==================================//
   $("#sponsors").owlCarousel({
       autoPlay: 3200,      
       items : 5,
       navigation: false,
       itemsDesktop : [1199,4],
       itemsDesktopSmall : [1024,4],
       itemsTablet : [768,3],
       itemsMobile : [500,2],
       pagination: true
   });



  // Slider Function-->
  $('.tp-banner').show().revolution({
    dottedOverlay:"none",
    delay:3000,
    startwidth:1170,
    startheight:925,
    minHeight:500,
    navigationType:"none",
    navigationArrows:"solo",
    navigationStyle:"preview1"
  });
  // End Slider Function-->
});	