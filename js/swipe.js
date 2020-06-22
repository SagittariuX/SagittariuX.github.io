
var galleryHandler = new Hammer($('div#artContainerMobile')[0]);
galleryHandler.on('swipeleft swiperight', function(event){
    if(Date.now() < $gSwipeTimeout) return;//prevents ghost clicks
    if($('img.mainArtMobile').length > 1){
        $('img.mainArtMobile').first().remove();
    }
    var target = $('img.mainArtMobile').first();//The element thats being manipulated
    target.addClass('topimage');
    var artnum = target.data('artnum');
    if(event.type === 'swipeleft'){
        artnum++;
        if(artnum > $gAllArtInfo.length-1){//carousel around to beginning
            artnum = 0;
        }
    } else if(event.type === 'swiperight'){
        artnum--;
        if(artnum < 0){//carousel around to ending
            artnum = $gAllArtInfo.length-1;
        }
    }
    //make the element that appears below the target
    loadMainArtMobile(artnum);
    addingClickHandlerToMainArtMobile();
    var directionX = (event.type === 'swipeleft')? '-100%' : '100%';
    transform2dTarget(target, directionX, '0', '0');

    //makes sure that desktop also keeps track of which picture is on
    $('div#artOptions img').eq(artnum).click();

    $gSwipeTimeout = Date.now() + 500;
    console.log('artGalleryMobile: '+event.type);
})

var playlistHandler = new Hammer($('#spotifyPlaylist')[0]);
playlistHandler.on('swipeleft swiperight', function(event){
    (event.type === 'swipeleft') ? formatTracks($gFocusTrack+1, event.type) : formatTracks($gFocusTrack-1, event.type);    
    $gSwipeTimeout = Date.now() + 100;
    console.log('spotifyPlaylist: '+event.type);
});
