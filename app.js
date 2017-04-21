function keyWordsearch() {
  gapi.client.setApiKey('AIzaSyCsxyRbIpVG8tvQDYbpY97ZL762_F45QWc');
  gapi.client.load('youtube', 'v3', function () {
    sendRequest();
  });
}

$('#search-form').submit(function (event) {
  event.preventDefault();
  keyWordsearch();

});

function sendRequest() {
  var q = $("#search-input").val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 10
  });
  request.execute(function (response) {
    console.log(response);
    $('#results').empty()
    $('#resultsContainer').css('display', "inline-block");
    var srchItems = response.result.items;
    $.each(srchItems, function (index, item) {
      vidTitle = item.snippet.title;
      vidThumburl = item.snippet.thumbnails.default.url;
      vidThumbimg = '<pre><img id="thumb" src="' + vidThumburl +
        '" alt="No  Image Available." style="width:204px;height:128px"></pre>';

      $('#results').append('<pre>' + vidTitle + vidThumbimg + '</pre>');
    })
  });
}