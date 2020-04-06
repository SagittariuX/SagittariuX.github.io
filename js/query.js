
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

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

var navbarOffset = $('#navbar').offset().top; //original distance from top
$(window).on('scroll', function(){
    if ($(window).offset().top > navbarOffset){
        $('#navbar').addClass('sticky');
    }
    else {
        $('#navbar').removeClass('sticky');
    }
});