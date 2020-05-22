var $gRefreshToken = 'AQDTVe-JKuA8THhMDrRid-7xsBwRB4ZXbYwz7qYP4sIHp8Mu5ZzWGwO-EhRjkl83_niTTTz3R-OwoNd-rh_mXy4AMEVV4ImZ0h-qFaqWBvsFpuXH68xfzN_joIM8g_uOs3w';
var $gGrantType = 'refresh_token';
var $gAuthorization = 'Basic MTM4Yjc5NDNkMDM1NGY3NThkZTg4YTEyOTRmNzJmNzM6OWRjYmVmNjM1NWRlNDg3YWExZTMxZDFiYjlhZWFkMjc=';
var $gPlaylistURL = 'https://api.spotify.com/v1/playlists/1Wk6rQOlHkVjiCB4SHVPGT/tracks';

var $previewTestURL = "https://p.scdn.co/mp3-preview/336de8bb32bb69560e1c5a74662c947bb2605493?cid=138b7943d0354f758de88a1294f72f73";
function getSpotifyAccess (){
    var $payload = 'grant_type='+$gGrantType+'&refresh_token='+$gRefreshToken;
    
    $.ajax({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        data: $payload,
        dataType: 'json',
        headers: {
            'Content-type':'application/x-www-form-urlencoded',
            'Authorization': $gAuthorization
        },
        success: function(data){
            console.log(data.access_token);
            getSpotifyPlaylist(data.access_token);
            return;
        },
        error: function(xhr, status, error){
            console.log('getSpotifyAccess() Status: '+status+' Error: '+error);
            return;
        }
    });
    return;
}

function getSpotifyPlaylist(token){
    $.ajax({
        url: $gPlaylistURL,
        method: 'GET',
        dataType: 'json',
        headers: {
            'Content-type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+token
        },
        success: function(data){
            getTracksInfo(data.items);
            return;
        },
        error: function(xhr, status, error){
            console.log('getSpotifyPlaylist() Status: '+status+' Error: '+error);
            return;
        }
    });
    return;
}

// Tracks returned from Spotify is not cleanly just tracks
// To get to tracks go in one more level from items

function getTracksInfo(tracks){
    tracks.forEach((item, index) => {
        
    });
    console.log('Tracks info compiled')
    return;
}
