
var galleryHandler = new Hammer($('div#artContainerMobile')[0]);
galleryHandler.on('swipeleft swiperight', function(event){
    if(Date.now() < $gSwipeTimeout) return;
    if($('img.mainArtMobile').length > 1){
        $('img.mainArtMobile').first().remove();
    }
    var target = $('img.mainArtMobile').first();
    target.addClass('topimage');
    
    var artnum = target.data('artnum');
    if(event.type === 'swipeleft'){
        artnum++;
        if(artnum > 5){//carousel around to beginning
            artnum = 0;
        }
    } else if(event.type === 'swiperight'){
        artnum--;
        if(artnum < 0){//carousel around to ending
            artnum = 5;
        }
    }
    appendMainArtMobile(artnum,'https://www.google.com', artnum ,'https://cdnb.artstation.com/p/assets/images/images/000/451/751/large/khyzyl-saleem-panterafinallow.jpg?1443927051');
    addingClickHandlerToMainArtMobile();
    var direction = (event.type === 'swipeleft')? '-100%' : '100%';
    transform2dTarget(target, direction, '0', '0');
    
    $gSwipeTimeout = Date.now() + 500;
    console.log('artGalleryMobile: '+event.type);
})

var playlistHandler = new Hammer($('#spotifyPlaylist')[0]);
playlistHandler.on('swipeleft swiperight', function(event){
    (event.type === 'swipeleft') ? formatTracks($gFocusTrack+1, event.type) : formatTracks($gFocusTrack-1, event.type);    
    $gSwipeTimeout = Date.now() + 100;
    console.log('spotifyPlaylist: '+event.type);
});
