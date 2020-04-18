
//getting the site ready
$(document).ready(function (){
    $(this).scrollTop();
    //Loads aboutme info
    $('.aboutMeText').each(function(index, element){
        $(element).load("text/intro/aboutme1.txt");
    });

    //loads experience info
    $('.experiencePicture').each(function(index, element){
        $(element).prop('src', 'pics/experience/placeholder'+index+'.png');
    });
    $('.experienceMobilePicture').each(function(index, element){
        $(element).prop('src', 'pics/experience/placeholder'+index+'.png');
    });
    $('.experienceItem').each(function(index, element){
        $.getJSON("text/experience/experience"+index+".json", function(json){
            loadInExperience(json, index);
        });
    });
    $('.experienceItemSplit').each(function(index, element){
        if (index%2){
            $(element).addClass('wow fadeInRight');
            //make the pic go towards the middle of the screen
            $(element).css('float', 'right'); 
        }
        else{
            $(element).addClass('wow fadeInLeft');
        }
    });
    $('.experienceMobileItem').each(function(index, element){
        $.getJSON("text/experience/experience"+index+".json", function(json){
            loadInExperienceMobile(json, index);
        });
        if (index%2){
            $(element).addClass('wow fadeInRight');
        }
        else{
            $(element).addClass('wow fadeInLeft');
        }
    });

    //loads compsci info
    $('#compSciText').load("text/compSci/aboutme1.txt");
    $('#compSciPic').prop('src', 'pics/compSci/placeholder0.png');

    //loads business info
    $('#businessText').load("text/business/aboutme1.txt");
    $('#businessTextMobile').load("text/business/aboutme1.txt");
    $('#businessPic').prop('src', 'pics/business/placeholder0.png');
    $('#businessPicMobile').prop('src', 'pics/business/placeholder0.png');

    //Loads education info
    $('#educationText').load("text/education/aboutme1.txt");
    $('#educationTextMobile').load("text/education/aboutme1.txt");
    $('#educationPic').prop('src', 'pics/education/placeholder0.png');
    $('#educationPicMobile').prop('src', 'pics/education/placeholder0.png');
    new WOW().init();
});

// Makes sure to rewind viewing history to top so animations could playout
// Only chrome needs to have this explicit command
$(window).on('beforeunload', function() {
    $(this).scrollTop(0);
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

function loadInExperience(json, index){
    $('.experienceTitle').eq(index).html(json.title);
    $('.experienceLocation').eq(index).html(json.location);
    $('.experienceText').eq(index).html(json.text);
    return null;
}

function loadInExperienceMobile(json, index){
    $('.experienceMobileTitle').eq(index).html(json.title);
    $('.experienceMobileLocation').eq(index).html(json.location);
    $('.experienceMobileText').eq(index).html(json.text);
    return null;
}


