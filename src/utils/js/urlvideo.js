export function getYoutubeVideoId(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

export function getVimeoVideoId(url) {
    var id = false;
    var request = new XMLHttpRequest();
    request.open('GET', 'https://vimeo.com/api/oembed.json?url=' + url, false);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            if (response.video_id) {
                id = response.video_id;
            }
        }
    };
    request.send();
    return id;
}

export function getEmbedURL(url) {

    var id = ''
    if (url.includes('youtube')) {
        id = getYoutubeVideoId(url)
        if(id && id){
            return 'https://www.youtube.com/embed/' + id
        }
    }
    else if (url.includes('vimeo')) {
        id = getVimeoVideoId(url)
        if(id && id){
            if(id && id){
                return 'https://player.vimeo.com/video/' + id
            }        
        }        
    }
    
    return
}