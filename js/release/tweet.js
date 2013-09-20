function InOut(elem) {
    elem.delay()
        .fadeIn()
        .delay(8000)
        .fadeOut(

    function () {
        if (elem.next().length > 0) // if there is a next element
        {
            InOut(elem.next());
        } // use it
        else {
            InOut(elem.siblings(':first'));
        } // if not, then use go back to the first sibling

    });
}

function parseDate(str) {
    var v = str.split(' ');
    return new Date(Date.parse(v[1] + " " + v[2] + ", " + v[5] + " " + v[3] + " UTC"));
}


function twitterLinks(text) {
    var base_url = 'http://twitter.com/';   // identica: 'http://identi.ca/'
    var hashtag_part = 'search?q=%23';        // identica: 'tag/'
    // convert URLs into links
    text = text.replace(
        /(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
        function ($0, $1, $2) {
            return ($1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>');
        });
    // convert protocol-less URLs into links        
    text = text.replace(
        /(:\/\/|>)?\b(([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.]*[^ !#?().,])?)/gi,
        function ($0, $1, $2) {
            return ($1 ? $0 : '<a href="http://' + $2 + '">' + $2 + '</a>');
        });
    // convert @mentions into follow links
    text = text.replace(
        /(:\/\/|>)?(@([_a-z0-9\-]+))/gi,
        function ($0, $1, $2, $3) {
            return ($1 ? $0 : '<a href="' + base_url + $3
                + '" title="Follow ' + $3 + '" target="_blank">@' + $3
                + '</a>');
        });
    // convert #hashtags into tag search links
    text = text.replace(
        /(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi,
        function ($0, $1, $2, $3) {
            return ($1 ? $0 : '<a href="' + base_url + hashtag_part + $3
                + '" title="Search tag: ' + $3 + '" target="_blank">#' + $3
                + '</a>');
        });
    return text;
}

(function () {
    var url = '\methods/Tweet';
    $.when($.getJSON(url, function (data) {
        $.each(data, function (i, item) {
            var json = $.parseJSON(item.RawSource)
            $('#tweets').append('<li>' + twitterLinks($.timeago(parseDate(json.created_at)) + ': ' + item.Text) + '</li>');
        });
    })).then(function () {
        var tweets = $('#tweets');
        tweets.find('li').hide();
        InOut(tweets.find('li:first'));
    });
})();