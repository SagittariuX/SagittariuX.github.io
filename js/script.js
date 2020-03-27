
//tracks which slide is currently in use
var currentCompSciSlide = 0; 
var currentBusinessSlide = 0;

//list of slide show pics
var compSciSlides = document.getElementsByClassName("compSciPics"); 

//compsci slideshow
function compSciSlideShow(n){
    //allows wrap arounds
    if(n < 0) {
        n = compSciSlides.length-1;
    }
    else if (n > compSciSlides.length-1){
        n = 0;
    }
    compSciSlides[currentCompSciSlide].style.display = "none";
    compSciSlides[n].style.display = "";

    var path = "text/aboutme" + n +".txt";
    $('#compSciText').load(path);
}

function moveCompSciSlide(n){
    compSciSlideShow(currentCompSciSlide += n);
}

//business slideshow
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
    var path = "pics/placeholder" + n + ".png";
    $("#businessPic").prop("src", path);
    path = "text/aboutme" + n +".txt";
    $('#businessText').load(path);
}

//experiments
function shiftBusinessInfo(n){
    var squares = document.getElementsByClassName("testsquare");
    var s; var str;
    var dx = 2;
    if(n == 1){
        console.log("shiftRight");
    }
    else {
        console.log("shiftLeft");
    }
    while(dx > 0){
        
        for(s = 0 ; s < squares.length ; s++){
            str = squares[s].style.left;
            
            console.log(str);
            squares[s].style.left = "200px";
            
        }
        dx -= 2;
    }
}




