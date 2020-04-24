//Global Variables
var $gExperiences = 3;
var $gCompSci = 3;
var $gBusiness = 3;



//getting the site ready
$(document).ready(function (){
    //Loads aboutme info
    $('.aboutMeText').each(function(index, element){
        $(element).load("text/intro/aboutme1.txt");
    });

    //loads experience info
    //dynamically create experienceItems & experienceMobileItem
    for(var $i = 0; i < $gExperiences; i++){
        $('.experience').append(`
        <div class="experienceItem">
            <div class="experienceItemSplit">
                <img class="experiencePicture"/>
            </div>
            <div class="experienceItemSplit">
                <h3 class="experienceTitle"></h3>
                <h3 class="experienceLocation"></h3>
                <div class="experienceText"></div>
            </div>
        </div>
        `);
    }
    
    //Note pictures are in reverse order
    $($('.experiencePicture').get().reverse()).each(function(index, element){
        $(element).prop('src', 'pics/experience/experience'+index+'.png');
    });
    $($('.experienceMobilePicture').get().reverse()).each(function(index, element){
        $(element).prop('src', 'pics/experience/experience'+index+'.png');
    });
    $('.experienceItem').each(function(index, element){
        $.getJSON("text/experience/experience"+index+".json", function(json){
            loadInExperience(json, index);
        });
    });
    $('.experienceItemSplit').each(function(index, element){
        if (index%2){
            $(element).addClass('wow fadeInRight');
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

var $navbarOffset = $('#navbar').offset().top; //original distance from top
var $navbarMobileOffset = $('#navbarMobile').offset().top; //original distance from top
$(window).on('scroll', function(){
    if ($(window).scrollTop() > $navbarOffset){
        $('#navbar').addClass('sticky');
    }
    else {
        $('#navbar').removeClass('sticky');
    }
    if ($(window).scrollTop() > $navbarMobileOffset){
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


