
var slideIndex = 0;
slideShow(slideIndex);

var businessSlide = 0;
businessSlideShow(businessSlide);
//compsci slideshow
function slideShow(n){
    var i;
    var slides = document.getElementsByClassName("compSciPics"); // list of slides
    var text = document.getElementById("compSciText");
    if (n > slides.length - 1)  {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length - 1}
    for (i = 0; i < slides.length; i++){
        slides[i].style.display = "none"; //set everything to nothing
    }
    slides[slideIndex].style.display = "";

    
    /*
    setTimeout(function(){
        moveSlides(1);
    }, 5000);
    */
}

function moveSlides(n){
    slideShow(slideIndex += n);
    slideShowText(slideIndex);
}


//Business slideshow


function businessSlideShow(n){
    var dots = document.getElementsByClassName("dots");
    var i;
    for(i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[n].className += " active";
    changeBusinessInfo(n);
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




