function keyWordsearch() {
  gapi.client.setApiKey('AIzaSyCsxyRbIpVG8tvQDYbpY97ZL762_F45QWc');
  gapi.client.load('youtube', 'v3', function() {
    sendRequest();
  });
}

$('#search-form').submit(function(event) {
  event.preventDefault();
  keyWordsearch();
});

function sendRequest() {
  var q = $('#search-input').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 6
  });
  request.execute(function(response) {
    console.log(response);
    $('#results').empty();
    var srchItems = response.result.items;
    seachCounter = srchItems.length;
    // resultCountTemplate = '<div class="container"> <hgroup class = "mb20" ><h1> Search Results </h1> <h2 class = "lead" > < strong class = "text-danger" > ' + searchCounter +
    // ' < /strong> results were found for the search for <strong class="text-danger">' + q + '</strong > < /h2> </hgroup><br>';
    $('#container2').empty();
    $('#container2').append('<h1>Search Results: </h1>');

    $.each(srchItems, function(index, item) {
      vidUrl = '"https://www.youtube.com/watch?v=' + item.id.videoId + '"';
      vidTitle =
        '<h3 class="title"><a href =' + vidUrl + '>' + item.snippet.title;
      +'</h3></a>';
      vidPost = item.snippet.publishedAt;
      vidDiscription = item.snippet.description;
      vidThumburl = item.snippet.thumbnails.default.url;

      vidThumbimg =
        '<a href=' +
        vidUrl +
        '> <pre><img id="thumb" src="' +
        vidThumburl +
        '" alt="No  Image Available."></pre></a>';

      resultTemplate =
        '<div class="items">' +
        vidThumbimg +
        vidTitle +
        '<br><h2 class="vidDisc">' +
        vidDiscription +
        '</h2></p></div><br>';

      $('#results').append('<br>' + resultTemplate);
    });
  });
}

function getmore() {
  //want to use the nextPageToken to get more results//
}
