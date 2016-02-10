$(document).ready(function() {
  var streamers = ["freecodecamp", "arteezy", "admiralbulldog", "brunofin", "comster404", "pashabiceps", "beyondthesummit", "eternalenvyy", "esl_csgo", "tbnrfrags"];

  streamers.forEach(function(channel) {
    $.getJSON("https://api.twitch.tv/kraken/streams/" + channel + "?callback=?", function(data) {
      var status, game;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account non-existent";
        status = "closed";
      } else {
        game = data.stream.game;
        status = "online";
      }
      $.getJSON("https://api.twitch.tv/kraken/channels/" + channel + "?callback=?", function(data) {
        var pic, name, details, commit;
        pic = data.logo != null ? data.logo : "http://cdn.truthinmedia.com/wp-content/uploads/2014/10/bigstock-silhouette-with-a-question-mar-59367497.jpg";
        name = data.display_name != null ? data.display_name : channel;
        details = status == "online" ? data.status : "";
        if (details.length >= 50)
          details = details.substring(0, 50) + ' ...';
        commit = '<div class="fond ' + status + '"><div class="col-md-2"><img src="' + pic + '" class="picture"></div><div class="col-md-3 vert-align"><a href="' + data.url + '"  target="_blank" style="color: black; font-size: 18px">' + name + '</a></div><div class="vert-align col-md-7" style="text-align:center">' + game + '<br>' + details + '</div></div>';
        if (status == "online")
          $("#streams").prepend(commit);
        else
          $("#streams").append(commit);
      });
    });
  });
});
