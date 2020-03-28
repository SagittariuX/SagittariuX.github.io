
$(document).ready(function (){
    //Loads initial information
    $('#aboutMeText0').load("text/intro/aboutme1.txt");
    $('#aboutMeText1').load("text/intro/aboutme1.txt");
    $('#aboutMeText2').load("text/intro/aboutme1.txt");
    $('#compSciText').load("text/compSci/aboutme0.txt");
    $('#businessText').load("text/business/aboutme0.txt");
    $('#educationText').load("text/education/aboutme0.txt");

    //Loads inital pics
    $('#compSciPic').prop('src', 'pics/compSci/placeholder0.png');
    $('#businessPic').prop('src', 'pics/business/placeholder0.png');
    $('#educationPic').prop('src', 'pics/education/placeholder0.png');
});