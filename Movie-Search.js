$(document).ready(function() {
    var searchTerm;
    var encodedSearch;
    var OMDB_url;

    function searchOMBd(){
        $("#toClear").empty();
        searchTerm = $('#searchTerm').val();
        encodedSearch = encodeURIComponent(searchTerm);
        OMDB_url = 'http://www.omdbapi.com/?t='+encodedSearch+'&r=json';

        $.ajax({
            url: OMDB_url,
            method: 'GET',
            beforeSend: function(){
                $("#message").html("Loading Information");
            },
            success: function(data) {
                if (data.Response == "False") {
                    $("#message").html(searchTerm + " was not found. Please try again.");
                } else {
                    $("#message").html(data.Title);
                    $("<img>").attr("src", data.Poster).attr("id", "poster").appendTo('#toClear');
                    $("<p>").html(data.Title + " was a " + data.Type + " directed by " + data.Director + " in " + data.Year + ". (Released on " + data.Released + ")").appendTo('#toClear');
                    $("<p>").html("Starring " + data.Actors + ", it's no wonder " + data.Title + " " + data.Awards).appendTo('#toClear');
                    var wikipedia = "https://en.wikipedia.org/wiki/"+data.Title;
                    $("<a>").attr('href', wikipedia).html("For more information click here!").appendTo('#toClear');
                }
            },
            error: function() {
                console.log(searchTerm + " could not be found");
            }
        });
    }

    $('#searchButton').first().on("click", searchOMBd);
    $("#searchTerm").on("keypress", function(e){
        if (e.which == 13){
            searchOMBd();
        }
    });
});
