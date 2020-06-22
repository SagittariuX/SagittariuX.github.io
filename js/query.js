//Global Variables
var $gExperiences = 5;
var $gCompSci = 5;
var $gAllArtInfo = [];
var $gFocusTrack;
var $gSwipeTimeout = 0;
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
                <h3 class="experiencePosition"></h3>
                <div class="experienceText"></div>
            </div>
        </div>
        `);

        $('.experienceMobile').append(`
        <div class="experienceMobileItem">
            <img class="experienceMobilePicture"/>
            <h3 class="experienceMobileTitle"></h3>
            <h3 class="experienceMobilePosition"></h3>
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
    $($('.experienceItem').get().reverse()).each(function(index, element){
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

    //loads art Info
    $.getJSON('text/artstation/artstation.json', function(json){
        $.each(json.items, function(index, item){ //gather everything into a list
            $gAllArtInfo.push(
                new ArtInfo(
                    item.pic_url,
                    item.text,
                    item.dir_url
                )
            );
        });
        console.log('art loaded');
        //all the desktop display art
        loadInArtOptions();
        loadMainArt($gAllArtInfo[0].pic_url, $gAllArtInfo[0].text, $gAllArtInfo[0].dir_url);
        addingClickHandlerToMainArt();
        addingClickHandlerToArtOptions();

        //all the mobile display art
        loadMainArtMobile()
        return;
    })
    addingClickHandlerToMainArtMobile();
    new WOW().init();
});

// Makes sure to rewind viewing history to top so animations could playout
// $(window).on('beforeunload', function() {
//     $(this).scrollTop(0);
// });  <--- Add this in later

$("#navbar").hover(function(){
    $("#navbar,#navbarIcon0, #navbarIcon1, #navbarIcon2, #menuList").addClass('toggle');
},function(){
    $("#navbar,#navbarIcon0, #navbarIcon1, #navbarIcon2, #menuList").removeClass('toggle');
});

function loadInExperience(json, index){
    var $pos = -1*index-1;
    $('.experienceTitle').eq($pos).html(json.title);
    $('.experiencePosition').eq($pos).html(json.position);
    $('.experienceText').eq($pos).html(json.text);
    return null;
}

function loadInExperienceMobile(json, index){
    var $pos = -1*index-1;
    $('.experienceMobileTitle').eq($pos).html(json.title);
    $('.experienceMobilePosition').eq($pos).html(json.position);
    $('.experienceMobileText').eq($pos).html(json.text);
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

// Things to do with spotify
function formatTracks(focus, handlerSource = null){
    if(Date.now() < $gSwipeTimeout) return; //prevent ghostclicks
    if(focus > -1 && focus < $('.spotifyTrack').length){//make sure nothing is out of index
        $gFocusTrack = focus;
    }else{
        return;
    }

    var $focus = $('.spotifyTrack').get(focus);
    var $player = $('audio#spotifyPlayer')[0];
    transform3dTarget($focus, 0, 0, 0, 0 , 0, 0, 0);
    formatLeftTracks(focus-1, -30);
    formatRightTracks(focus+1, 30);

    $player.volume = 0.5;
    changeAudio(focus, $player, handlerSource);
    changeSongInfo(focus);
    return;
}
//formats all the tracks left of main track
function formatLeftTracks(focus, offset){
    if(focus < 0) return;
    var $focus = $('.spotifyTrack').get(focus);
    transform3dTarget($focus, offset, 0, -200, 0 , 1, 0, 60);
    formatLeftTracks(focus-1, offset-10);
    return;
}
//formats all the tracks right of main track
function formatRightTracks(focus, offset){
    if($('.spotifyTrack').get(focus)){
        var $focus = $('.spotifyTrack').get(focus) ;
    }else{
        return;
    }
    transform3dTarget($focus, offset, 0, -200, 0 , 1, 0, -60);
    formatRightTracks(focus+1, offset+10);
    return;
}
//changes audio src also pauses/plays audio
function changeAudio (focus, player, handlerSource = null){
    if(player.src !== $gSpotifyTracks[focus].previewUrl){
        player.src = $gSpotifyTracks[focus].previewUrl;
        player.load();
    }else{//same song pause it
        player.paused? player.play(): player.pause();
        return;
    }
    if(handlerSource){//only play the song if user explicitly commands
        player.play();
    }
    return;
}
function changeSongInfo(focus){
    var $name = $('h2#trackName');  
    var $artists = $('h3#trackArtists');
    $name.empty(); $artists.empty();

    $name.append(`
        <a href='${$gSpotifyTracks[focus].spotifyUrl}' target='_blank'>
            ${$gSpotifyTracks[focus].songName}
        </a>
    `);

    var $artistsString = '';
    $gSpotifyTracks[focus].artists.forEach( (artist) => {
        $artistsString += `
            <a href='${artist.external_urls.spotify}' target='_blank'>
                ${artist.name}
            </a>
        `;
    });
    $artists.append($artistsString);

    return;
}

//target here is a DOM element
function transform3dTarget(target, moveX, moveY, moveZ, rotateX, rotateY, rotateZ, angle){
    target.style.transform = `translate3d(${moveX}vw, ${moveY}px, ${moveZ}px)
                              rotate3d(${rotateX},${rotateY},${rotateZ},${angle}deg)`;
    target.style.MozTransform = `translate3d(${moveX}vw, ${moveY}px, ${moveZ}px)
                                 rotate3d(${rotateX},${rotateY},${rotateZ},${angle}deg)`;
    target.style.webkitTransform = `translate3d(${moveX}vw, ${moveY}px, ${moveZ}px)
                                 rotate3d(${rotateX},${rotateY},${rotateZ},${angle}deg)`;
    return;
}

//target here is a jquery element 
function transform2dTarget(target, moveX, moveY, rotateAngle){
    var transformations = `translate(${moveX}, ${moveY}) rotate(${rotateAngle})`;
    target.css('transform', transformations);
    target.css('-moz-transform', transformations);
    target.css('-webkit-transform', transformations);
    
    return;
}
//Things to do with spotify ends

//Things to do with artstation
function loadMainArt(pic_url, text, dir_url){
    var canvas = $('img#mainArt')[0];
    var textBox = $('div#artText span')[0];
    $(canvas).prop('src', pic_url);
    $(canvas).data("dirurl", dir_url);
    $(textBox).empty();
    $(textBox).html(text);
    $('div#artOptions img').each(function(index, element){
        $(element).removeClass('toggle');
        return;
    });
    return;
}

function loadInArtOptions(){
    var width = 100/($gAllArtInfo.length) ;
    var offset = 0;
    var options = $('div#artOptions')[0];
    $.each($gAllArtInfo, function(index, art){
        offset = index*width;
        $(options).append(`
            <img style="left:${offset}%; width:${width}%" 
                 class=${(index == 0)? 'toggle': ''}
                 src="${art.pic_url}"
                 data-picurl="${art.pic_url}"
                 data-text="${art.text}"
                 data-dirurl="${art.dir_url}">
        `);
    });
}

function loadMainArtMobile(artnum = 0){
    appendMainArtMobile($gAllArtInfo[artnum].pic_url, $gAllArtInfo[artnum].text, $gAllArtInfo[artnum].dir_url, artnum);
    //change the flavour text
    var target = $('img.mainArtMobile').last();//the current element in display
    $('div#artTextMobile span').html(target.data('text'));

    return;
}

function appendMainArtMobile(src,text,dirurl,artnum){
    $('div#artContainerMobile').append(`
        <img class="mainArtMobile"
             draggable="false"
             data-artnum="${artnum}"
             data-dirurl="${dirurl}"
             data-text="${text}"
             src="${src}"
        >
    `);
    
    return;
}

function addingClickHandlerToArtOptions(){
    $('div#artOptions img').each(function (index, element){
        $(element).click(function(){
            loadMainArt($(this).data('picurl'),$(this).data('text'), $(this).data('dirurl'));
            addToggle($(this));
        });
        return;
    });
    return;
}
function addingClickHandlerToMainArt(){
    var canvas = $('img#mainArt')[0];
    $(canvas).click(function(){
        window.open($(this).data('dirurl'));
    });
    return;
}
function addingClickHandlerToMainArtMobile(){
    $('img.mainArtMobile').each(function(index, element){
        $(element).off('click');
        $(element).on('click', function(){
            if(Date.now() < $gSwipeTimeout) return;//prevents ghostclicks
            window.open($(this).data('dirurl'));
        })
        return;
    });
    return;
}

class ArtInfo{
    constructor(pic_url, text, dir_url){
        this.pic_url = pic_url;
        this.text = text;
        this.dir_url = dir_url;
    }
}
//Things to do with artstation ends

function addToggle(element){
    $(element).addClass('toggle');
    return;
}