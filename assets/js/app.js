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
  var q = $('#search-input').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 9
  });

  request.execute(function (response) {

    $('#results').empty();

    $.each(response.result.items, function (index, item) {

      var $template = $(
        '<li><img class="thumbnail"><a class="url"><h3 class="title"></h3></a><p class="description"></p></li>'
      );

      $template
        .find('.thumbnail')
        .attr('src', item.snippet.thumbnails.high.url);
      $template
        .find('.url')
        .attr('href', 'https://www.youtube.com/watch?v=' + item.id.videoId);
      $template.find('.title').text(item.snippet.title);
      $template.find('.description').text(item.snippet.description);

      $('#results').append($template);

    });
  });
}