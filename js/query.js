//Global Variables
var $gExperiences = 5;
var $gCompSci = 5;
var $gBusiness = 3;
var $gSpotifyResponse ;
//getting the site ready
$(document).ready(function (){
    //Starts up the Spotify access process
    getSpotifyAccess(); 
    //Loads aboutme info
   

    $('.aboutMeText').each(function(index, element){
        $(element).load("text/intro/aboutme1.txt");
    });

    //loads experience info
    //dynamically create experienceItems & experienceMobileItem
    for(var $i = 0; $i < $gExperiences; $i++){
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

        $('.experienceMobile').append(`
        <div class="experienceMobileItem">
            <img class="experienceMobilePicture"/>
            <h3 class="experienceMobileTitle"></h3>
            <h3 class="experienceMobileLocation"></h3>
            <div class="experienceMobileText"></div>
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
    for(var $i = 0; $i < $gCompSci ; $i++){//generates radio buttons
        if($i == 0){
            $('.compSciSlidesFrame form').append(`
                <input type="radio" name="compSciPics" id="cspic`+$i+`" checked>
            `);
        }
        else{
            $('.compSciSlidesFrame form').append(`
                <input type="radio" name="compSciPics" id="cspic`+$i+`">
            `);
        }
    }
    for(var $i = 0 ; $i < $gCompSci ; $i++){//generates the visuals for buttons
        $('.compSciSlidesFrame form').append(`
            <label for="cspic`+$i+`" id="compSciPic`+$i+`" onclick="loadInCompSciText(`+$i+`)">
                <img src="pics/compSci/pic`+$i+`.png" />
            </label> 
        `);
    }
    loadInCompSciText(0);
    
    //loads business info
    $("#imgFlipSide0 img").prop('src', 'pics/business/placeholder0.png');
    

    new WOW().init();
});

// Makes sure to rewind viewing history to top so animations could playout
// Only chrome needs to have this explicit command
// $(window).on('beforeunload', function() {
//     $(this).scrollTop(0);
// });  <--- Add this in later

$("#navbar").hover(function(){
    $("#navbar,#navbarIcon0, #navbarIcon1, #navbarIcon2, #menuList").addClass('toggle');
},function(){
    $("#navbar,#navbarIcon0, #navbarIcon1, #navbarIcon2, #menuList").removeClass('toggle');
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

function loadInCompSciText(fileNum){
    $.getJSON("text/compSci/cs"+fileNum+".json", function(json){
        //loads in the star rating system
        $('#compSciRating').empty();
        for(var $i = 0; $i < 5; $i++){
            if($i < json.stars){
                $('#compSciRating').append(`
                    <img class="stars goldstar animated heartBeat"/>
                `);
            }
            else{
                $('#compSciRating').append(`
                    <img class="stars blackstar"/>
                `); 
            }
        }
        //loads in the actual text
        $('#compSciText').html(json.text);
    });
    return null;
}

var $gFlipcardSide = 0;//keeps track of which side is currently face up
function flipMe(num){
    if($('.dots').eq(num).hasClass('toggle')){
        return null;
    }

    var $imgTarget;
    var $textTarget;
    if($gFlipcardSide == 0){
        $gFlipcardSide = 1;
        $imgTarget = $('#imgFlipSide1 img');
        $textTarget = $('#textFlipSide1');
    }else{
        $gFlipcardSide = 0;
        $imgTarget = $('#imgFlipSide0 img');
        $textTarget = $('#textFlipSide0');
    }
    $('.dots').each(function(index, element){
        if(num == index){
            $(element).addClass('toggle');
        }
        else{
            $(element).removeClass('toggle');
        }
    });
    $imgTarget.prop('src', 'pics/business/placeholder1.png')
    $('.flipcard').toggleClass('flipping');
    return null;
}


function addingClickHandlerToTracks(){
    $('.spotifyTrack').each((index, element) => {
        $(element).click(() =>{
            formatTracks(index);
        } )
    });
    return;
}

function formatTracks(focus){
    var $focus = $('.spotifyTrack').get(focus);
    transform3dTarget($focus, 0, 0, 0, 0 , 0, 0, 0);
    formatLeftTracks(focus-1, -300);
    formatRightTracks(focus+1, 300);
    return;
}
//formats all the tracks left of main track
function formatLeftTracks(focus, offset){
    if(focus < 0) return;
    var $focus = $('.spotifyTrack').get(focus);
    transform3dTarget($focus, offset, 0, -200, 0 , 1, 0, 60);
    formatLeftTracks(focus-1, offset-100);
    return;
}
function formatRightTracks(focus, offset){
    if($('.spotifyTrack').get(focus)){
        var $focus = $('.spotifyTrack').get(focus) ;
    }else{
        return;
    }
    transform3dTarget($focus, offset, 0, -200, 0 , 1, 0, -60);
    formatRightTracks(focus+1, offset+100);
    return;
}

// function myFunc(focus){
//     var $focus = $('.spotifyTrack').get(focus) ;
//     transform3dTarget($focus, 300, 0 , -100, 0 , 1, 0, -60);
//     return;
// }
function transform3dTarget(target, moveX, moveY, moveZ, rotateX, rotateY, rotateZ, angle){
    target.style.transform = `translate3d(${moveX}px, ${moveY}px, ${moveZ}px)
                              rotate3d(${rotateX},${rotateY},${rotateZ},${angle}deg)`;
}

