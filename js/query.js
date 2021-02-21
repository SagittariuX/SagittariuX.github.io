//Global Variables
var $gNavOffset;
var $gLastScroll = 0;
var $gFocusTrack;
var $gSwipeTimeout = 0;
//getting the site ready
$(document).ready(function (){
    //Starts up the Spotify access process
    getSpotifyAccess(); 


    $('#banner').prop('src', 'pics/banner/ComputerText.svg?ver='+$.now());
    setTimeout(() => {
        $('nav').css('display', 'flex');
        $('#contentWrapper').css('display', 'block');
        $('nav').scrollTo();
        $gNavOffset = $('nav').offset()
    }, 4500);
    
    //Loads aboutme info
    $('.aboutMeText').each(function(index, element){
        $(element).load("text/intro/aboutme1.txt");
    });

    //loads experience info
    //dynamically create experienceItems & experienceMobileItem
    $.getJSON("text/experience/exp.json", (json) => {
        loadInExperience(json);
    });
    //end loading experience

    //loads compsci info
    $.getJSON("text/compSci/cs.json", (json) => {
        loadInCompSci(json);
        addToggle($('.skillsListButton').first());
        addToggle($('.skillsText').first());

        $('.skillsListButton').click(function(){
            if ($(this).hasClass('toggle')) return ;
            
            removeToggle($('.skillsListButton.toggle'));
            addToggle($(this));
    
            removeToggle($('.skillsText.toggle'));
            addToggle($('.skillsText[data-name="'+$(this).data('name')+'"]'));
        });

    });

    //end loading experience

    feather.replace(); //replaces icons with feather svg
    new WOW().init(); // activates wow animations
});

// Makes sure to rewind viewing history to top so animations could playout
// $(window).on('beforeunload', function() {
//     $(this).scrollTop(0);
// });  <--- Add this in later

//things to do with navbar
$(window).scroll(function(){
    var scrollDir = ($(window).scrollTop() > $gLastScroll) ? 'down' : 'up';
    $gLastScroll = $(window).scrollTop();
    stickyNav();
    (scrollDir == 'down') ? hideNav() : showNav();
    return; 
});

$('#navigationSection ul li a').click(function(){
    console.log('triggered');
    var section = $(this).data('section');
    if($(section).scrollTop() < $(window).scrollTop()){// scrolling to a previous section
        hideNav();
        $('nav').addClass('manual');
        setTimeout(() => {
            $('nav').removeClass('manual');
        }, 1000);
    }
    return;
});

$(window).resize(function(){
    if ($(window).width() > 1024){//resets mobile view navigation
        removeToggle($('#myLogo'));
        removeToggle($('#navigationSection'));
    }
})


$('#myLogo').click(function(){
    if ($(window).width() > 1024) return;
    toggleToggle($(this));
    toggleToggle($('#navigationSection'));
});

function stickyNav(){
    if($(window).scrollTop() > $gNavOffset.top){
        $('nav').addClass('stickToTop');
    }else{
        $('nav').removeClass('stickToTop');
    }
    return;
}

function hideNav(){
    if($('nav').hasClass('stickToTop')){
        $('nav').addClass('hideNav');
        $('#myLogo').removeClass('toggle');
        $('#navigationSection').removeClass('toggle');
    }
    return;
}

function showNav(){
    if(!$('nav').hasClass('manual')){
        $('nav').removeClass('hideNav');
    }
}

//Things to do with experience
function loadInExperience(json){
    picuri = "pics/experience/";
    for(var $i = 0; $i < json.items.length; $i++){
        $('#experience').append(`
            <div class="experienceItem wow fadeInUp">
                <div>
                    <img class="experiencePic" src="${picuri + json.items[$i].pic}">
                </div>
            
                <div class="experienceText">
                    <h3 class="experiencePosition">${json.items[$i].position}</h3>
                    <div>
                        ${json.items[$i].text}
                    </div>
                </div>
            </div>
        `);
    }
}

//Things to do with experience ends

//Things to do with CompSci
function loadInCompSci(json){
    for(var $i = 0; $i < json.items.length; $i++){

        $('#skillsList').append(`
            <li>
                <button class="skillsListButton" data-name="${json.items[$i].name}">
                    <span>${json.items[$i].title}</span>
                </button>
            </li>
        `);


        $('#compSci').append(`
            <div class="skillsText" data-name="${json.items[$i].name}">
                <ul class="skillsTextList">
                </ul>
            </div>
         `);

        $.each(json.items[$i].text, function(index, value){
            $('.skillsTextList').last().append(`
                <li>${value}</li>
            `);
        });
    }
}


//Things to do with compsci ends

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
//Things to do with spotify ends

//Helper Functions

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

function addToggle(element){
    $(element).addClass('toggle');
    return;
}
function removeToggle(element){
    $(element).removeClass('toggle');
    return;
}
function toggleToggle(element){
    if(element.hasClass('toggle')){
        element.removeClass('toggle');
    }
    else{
        $(element).addClass('toggle');
    }
    return;
}