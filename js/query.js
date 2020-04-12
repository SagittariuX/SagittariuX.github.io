
$(document).ready(function (){
    $(this).scrollTop(0);
    
    //Loads initial information
    $('.aboutMeText').each(function(index, element){
        $(element).load("text/intro/aboutme1.txt");
    });
    $('#compSciText').load("text/compSci/aboutme1.txt");
    $('#businessText').load("text/business/aboutme1.txt");
    $('#businessTextMobile').load("text/business/aboutme1.txt");
    $('#educationText').load("text/education/aboutme1.txt");
    $('#educationTextMobile').load("text/education/aboutme1.txt");

    //Loads inital pics
    $('#compSciPic').prop('src', 'pics/compSci/placeholder0.png');
    $('#businessPic').prop('src', 'pics/business/placeholder0.png');
    $('#businessPicMobile').prop('src', 'pics/business/placeholder0.png');
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

// enables animation everytime hover happens
// $("#navbarMobile").hover(
//     function(){
//         $("#navbarMobileDropDown").addClass("wow slideInDown");
//     }, 
//     function(){
//         $("#navbarMobileDropDown").removeClass("wow slideInDown")
//     }
// );