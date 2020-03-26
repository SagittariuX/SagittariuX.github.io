
function slideShowText(n){
    var path = "text/aboutme" + n +".txt";
    $('#compSciText').load(path);
}

function changeBusinessInfo (n){
    var path = "pics/placeholder" + n + ".png";
    $("#businessPic").prop("src", path);
    path = "text/aboutme" + n +".txt";
    $('#businessText').load(path);

}




$(document).ready(function (){

    //Loads initial information
    $('#compSciText').load("text/aboutme0.txt");
    $('#businessText').load("text/aboutme0.txt");
    $('#educationText').load("text/aboutme0.txt");


});