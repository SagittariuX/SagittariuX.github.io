
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
    var overlay = $(this).find('div.csoverlay');
    switch(edge){
        case 'top':
            overlay.css({'left':'0%', 'top': '-100%'});
            overlay.animate({
                left: '0%',
                top: "0%"
            },{
                queue: false,
                duration: 200
            });
            //transform2dTarget(overlay, '0%', '100%', '0');
            break;
        case 'bot':
            overlay.css({'left':'0%' , 'top': '100%'});
            overlay.animate({
                left: '0%',
                top: "0%"
            },{
                queue: false,
                duration: 200
            });
            //transform2dTarget(overlay, '0%', '-100%', '0');
            break;
        case 'left':
            overlay.css({'left':'-100%' , 'top': '0%'});
            overlay.animate({
                left: '0%',
                top: "0%"
            },{
                queue: false,
                duration: 200
            });
           // transform2dTarget(overlay, '100%', '0%', '0');
            break;
        case 'right':
            overlay.css({'left':'100%' , 'top': '0%'});
            overlay.animate({
                left: '0%',
                top: "0%"
            },{
                queue: false,
                duration: 200
            });
           // transform2dTarget(overlay, '-100%', '0%', '0');
            break;
    }

    return;
});

$('div.compSciBlock').mouseleave(function (event){
    var offset = $(this).offset();
    var x = event.pageX - offset.left;
    var y = event.pageY - offset.top;
    var width = $(this).width();
    var height = $(this).height();
    var edge = nearestEdge(x,y,width,height);
    var overlay = $(this).find('div.csoverlay');
    switch(edge){
       
        case 'top':
            overlay.animate({
                left: '0%',
                top: "-100%"
            },{
                queue: false,
                duration: 200
            });
            break;
        case 'bot':
            overlay.animate({
                left: '0%',
                top: "100%"
            },{
                queue: false,
                duration: 200
            });
            break;
        case 'left':
            overlay.animate({
                left: '-100%',
                top: "0%"
            },{
                queue: false,
                duration: 200
            });
            break;
        case 'right':
            overlay.animate({
                left: '100%',
                top: "0%"
            },{
                queue: false,
                duration: 200
            });
            break;
    }

    return;
});



