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


(function () {
    var url = '\methods/Tweet';
    $.when($.getJSON(url, function (data) {
        $.each(data, function (i, item) {
            var json = $.parseJSON(item.RawSource)
            $('#tweets').append('<li>' + $.timeago(parseDate(json.created_at)) + ': ' + item.TextAsHtml + '</li>');
        });
    })).then(function () {
        var tweets = $('#tweets');
        tweets.find('li').hide();
        InOut(tweets.find('li:first'));
    });
})();