function InOut(elem) {
    elem.delay()
        .fadeIn()
        .delay(4000)
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

(function () {
    var url = '\methods/Tweet';
    $.when($.getJSON(url, function (data) {
        $.each(data, function (i, item) {
            var json = $.parseJSON(item.RawSource)
            $('#tweets').append('<li>' + $.timeago(new Date(Date.parse(json.created_at.replace(/( \+)/, ' UTC$1')))) + ': ' + item.TextAsHtml + '</li>');
        });
    })).then(function () {
        var tweets = $('#tweets');
        tweets.find('li').hide();
        InOut(tweets.find('li:first'));
    });
})();