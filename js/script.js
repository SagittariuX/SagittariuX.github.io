
//tracks which slide is currently in use
var currentBusinessSlide = 0;

//compsci slideshow

//business slideshow setting up and checks 
function businessSlideShow(n){
    var dots = document.getElementsByClassName("dots");
    var i;
    for(i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[n].className += " active";
    changeBusinessInfo(n);
}

// change the text documents on the left side of the business pic
function changeBusinessInfo (n){
    var path = "pics/business/placeholder" + n + ".png";
    $("#businessPic").prop("src", path);
    $("#businessPicMobile").prop("src", path);
    path = "text/business/aboutme" + n +".txt";
    $('#businessText').load(path);
    $('#businessTextMobile').load(path);
} 

