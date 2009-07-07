/**
 * Twitter search-in-a-box
 * By Daniel Camargo (http://twitter.com/pererinha | http://danielcamargo.com.br/)
 * Copyright (c) 2009
 * Released under the MIT license (MIT-LICENSE.txt)
 * Demo: http://www.danielcamargo.com.br/stuffs/twitter-search-in-box/
 * 
 * First, make sure you're using jQuery http://www.jquery.com/
 *
 */
var config = {
	/* search term */
	search  : 'twitter', 
	/* milliseconds */
	speed   : 1500,  
	/* consider that the image is a square */
	imgSize	: 48, 
	/* number of results */
	results : 30,
	/* How many elements is be showed per time */
	perTime	: 2, 
	/* LI height */
	heightLi: 72,
	/* element where the ul is going to be writted */
	elemID  : 'el', 
	/* List id */
	listID	: 'list'
}
function createSearchURL(){
	return 'http://search.twitter.com/search.json?rpp=' + config.results + '&callback=parseJson&q=' + config.search;
}

$(document).ready(function(){
	var script = $('<script></script>');
	script.attr('src',createSearchURL());
	var searchForH = $('<h3></h3>');
	var searchForSpan = $('<span></span>');
	searchForSpan.html('Searching for "' + config.search + '":');
	searchForH.append(searchForSpan);
	$('head').append(script);
	$('#el')
		.append(searchForH)
		.append(div);
});

function createMessageBox(obTwitted){
	preLoadImage(obTwitted.profile_image_url);
	var elImg = $('<img/>');
		elImg
			.attr('src',obTwitted.profile_image_url)
			.attr('width', config.imgSize)
			.attr('height',config.imgSize)
			.attr('border','0');
	var elImgLnk = $('<a></a>');
		$(elImgLnk)
			.attr('href','http://twitter.com/' + obTwitted.from_user)
			.append(elImg);
	var elMsg = $('<span></span>');
		elMsg.append(obTwitted.text);
	var elLnk = $('<a></a>');
		$(elLnk)
			.attr('href','http://twitter.com/' + obTwitted.from_user)
			.append(obTwitted.from_user)
	var elDiv = $('<div></div>');
		$(elDiv)
			.append(elImgLnk)
			.append(elLnk)
			.append('<br />')
			.append(elMsg);
	var elLi = $('<li></li>');
	elLi.append(elDiv);
	return elLi;
}
function parseJson(oJson){
	var elUl = $('<ul></ul>');
	elUl.attr('id',config.listID);
	for(twitter in oJson.results){
		elUl.append(createMessageBox(oJson.results[twitter]));
	}
	$('div#' + config.elemID).append(elUl);
	$('#' + config.listID).css('height',(config.perTime * config.heightLi) + 'px');
	setTimeout(function(){rotateElement()},config.speed);
}

function preLoadImage(src){
	var oImagePreLoad = new Image();
	oImagePreLoad.src = src;	
}

function rotateElement(){
	contentActual = $('ul#' + config.listID + ' li:first').html();
	$('ul#' + config.listID + ' li:first')
		.animate({opacity: 0}, config.speed)
		.fadeOut('fast', function() {$(this).remove();
			var elLi = $('<li></li>');
			elLi.append(contentActual);
			$('ul#' + config.listID).append(elLi)
			$('ul#' + config.listID + ' li:last')
				.animate({opacity: 1}, config.speed)
				.fadeIn('fast');
		});
	setTimeout(function(){rotateElement()},config.speed);
}