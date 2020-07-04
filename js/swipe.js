
//swipe handler for CompSci
var compSciHandler = new Hammer($('div#compSci')[0]);
compSciHandler.on('swipeleft swiperight', function(event){
    console.log('compSci: '+event.type);
    return ;
});


//swipe handler for art gallery(mobile)
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

//swipe hander for music player
var playlistHandler = new Hammer($('#spotifyPlaylist')[0]);
playlistHandler.on('swipeleft swiperight', function(event){
    (event.type === 'swipeleft') ? formatTracks($gFocusTrack+1, event.type) : formatTracks($gFocusTrack-1, event.type);    
    $gSwipeTimeout = Date.now() + 100;
    console.log('spotifyPlaylist: '+event.type);
});


//functions for directional hover
function calcDistance(x1,y1,x2,y2){
    var diffX = x1 - x2;
    var diffY = y1 - y2;
    return (diffX * diffX) + (diffY * diffY);
}

function nearestEdge(x,y,w,h){
    var topEdge = calcDistance(x,y,w/2,0);
    var botEdge = calcDistance(x,y,w/2,h);
    var leftEdge = calcDistance(x,y,0,h/2);
    var rightEdge = calcDistance(x,y,w,h/2);

    var min = Math.min(topEdge,botEdge,leftEdge,rightEdge);
    switch(min){
        case topEdge:
            return 'top';
        case botEdge:
            return 'bot';
        case leftEdge:
            return 'left';
        case rightEdge:
            return 'right';
    }
}

$('div.compSciBlock').mouseenter(function(event){
    var offset = $(this).offset();
    var x = event.pageX - offset.left;
    var y = event.pageY - offset.top;
    var width = $(this).width();
    var height = $(this).height();
    var edge = nearestEdge(x,y,width,height);
    
    console.log('nearestEdge Enter:'+edge)

    return;
});
$('div.compSciBlock').mouseleave(function(event){
    var offset = $(this).offset();
    var x = event.pageX - offset.left;
    var y = event.pageY - offset.top;
    var width = $(this).width();
    var height = $(this).height();
    var edge = nearestEdge(x,y,width,height);
    
    console.log('nearestEdge Exit:'+edge)

    return;
});



