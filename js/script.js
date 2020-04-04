
//tracks which slide is currently in use
var currentCompSciSlide = 0; 
var currentBusinessSlide = 0;

const numOfCompSciSlides = 2;

//compsci slideshow
function compSciSlideShow(n){
    currentCompSciSlide += n;
    //allows wrap arounds
    if(currentCompSciSlide < 0) {
        currentCompSciSlide = numOfCompSciSlides-1;
    }
    else if (currentCompSciSlide > numOfCompSciSlides-1){
        currentCompSciSlide = 0;
    }
    changeCompSciInfo(currentCompSciSlide);
}

function changeCompSciInfo(n){
    var path = "pics/compSci/placeholder"+ n +".png";
    $('#compSciPic').prop('src',path);
    path = "text/compSci/aboutme"+ n +".txt";
    $('#compSciText').load(path);
}


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
