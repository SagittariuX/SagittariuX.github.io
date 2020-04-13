
$(document).ready(function (){
    $(this).scrollTop(0);
    
    //Loads aboutme info
    $('.aboutMeText').each(function(index, element){
        $(element).load("text/intro/aboutme1.txt");
    });

    //loads experience info
    $('.experienceMobilePicture').each(function(index, element){
        $(element).prop('src', 'pics/experience/placeholder'+index+'.png');
    });
    $('.experienceMobileText').each(function(index, element){
        $(element).load('text/experience/aboutme'+index+'.txt');
    });

    //loads compsci info
    $('#compSciText').load("text/compSci/aboutme1.txt");
    $('#compSciPic').prop('src', 'pics/compSci/placeholder0.png');

    //loads business info
    $('#businessText').load("text/business/aboutme1.txt");
    $('#businessTextMobile').load("text/business/aboutme1.txt");
    $('#businessPic').prop('src', 'pics/business/placeholder0.png');
    $('#businessPicMobile').prop('src', 'pics/business/placeholder0.png');

    //Loads education info
    $('#educationText').load("text/education/aboutme1.txt");
    $('#educationTextMobile').load("text/education/aboutme1.txt");
    $('#educationPic').prop('src', 'pics/education/placeholder0.png');
    $('#educationPicMobile').prop('src', 'pics/education/placeholder0.png');
});

// Makes sure to rewind viewing history to top so animations could playout
// Only chrome needs to have this explicit command
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

var navbarOffset = $('#navbar').offset().top; //original distance from top
var navbarMobileOffset = $('#navbarMobile').offset().top; //original distance from top
$(window).on('scroll', function(){
    if ($(window).scrollTop() > navbarOffset){
        $('#navbar').addClass('sticky');
    }
    else {
        $('#navbar').removeClass('sticky');
    }
    if ($(window).scrollTop() > navbarMobileOffset){
        $('#navbarMobile').addClass('sticky');
    }
    else {
        $('#navbarMobile').removeClass('sticky');
    }
});

