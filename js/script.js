
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
    path = "text/aboutme"+ n +".txt";
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




