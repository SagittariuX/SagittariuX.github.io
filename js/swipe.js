var galleryHandler = new Hammer($('#artGallery')[0]);

galleryHandler.on('swipeleft swiperight', function(event){
    console.log(event.type);
});

var playlistHandler = new Hammer($('#spotifyPlaylist')[0]);

playlistHandler.on('swipeleft', function(event){
    formatTracks($gFocusTrack+1, event.type);
    $gSwipeTimeout = Date.now() + 100;
    console.log(event.type);
});
playlistHandler.on('swiperight', function(event){
    formatTracks($gFocusTrack-1, event.type);
    $gSwipeTimeout = Date.now() + 100;
    console.log(event.type);
});
