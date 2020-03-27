


$(document).ready(function (){
    //Loads initial information
    $('$aboutMeText0').load("text/aboutme0.txt");
    $('$aboutMeText1').load("text/aboutme0.txt");
    $('$aboutMeText2').load("text/aboutme0.txt");
    $('#compSciText').load("text/aboutme0.txt");
    $('#businessText').load("text/aboutme0.txt");
    $('#educationText').load("text/aboutme0.txt");

    //sets up intial slides
    $.each(compSciSlides, function(index, value){
        value.hide()
    });

    compSciSlideShow(compSciSlide);
    businessSlideShow(businessSlide);
});