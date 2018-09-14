

$(document).ready(function () {
    var topics = ["The Little Mermaid", "Monsters, Inc.", "Tangled", "Haruhi Suzumiya", "Coraline", "Hey Arnold!"];
    var secondTopics = ["Disney", "Pixar", "Disney", "Anime", "Stop-Motion", "Nickelodeon"];
    var num = 0;

    //creates buttons based on the above two arrays
    var createButtons = function () {
        for (var i = 0; i < topics.length; i++) {
            var moviebtn = $("<button>");
            moviebtn.addClass("gifButton");
            moviebtn.attr("data-movie", topics[i]);
            moviebtn.attr("data-param2", secondTopics[i]);
            if (secondTopics[i] !== "") {
                moviebtn.text(topics[i] + " (" + secondTopics[i] + ")");
            } else {
                moviebtn.text(topics[i]);
            }
            $("#btnColumn").append(moviebtn);
        }
    };
    createButtons();

    //disables submit button and hide clearFavorites button
    $("#search").prop("disabled", true);
    $("#clearFavorites").hide();

    //adds input parameters to arrays and creates new buttons based on updated arrays
    $("#search").on("click", function () {
        $("#btnColumn").empty();
        var parameter1 = $("#inputParameter").val().trim();
        var parameter2 = $("#2ndParameter").val().trim();
        topics.push(parameter1);
        secondTopics.push(parameter2);
        createButtons();
        $("#inputParameter").val("");
        $("#2ndParameter").val("");
        console.log(topics);
        console.log(secondTopics);
        $("#search").prop("disabled", true);

    });

    //enables the submit button only when the input field is not empty
    $("#inputParameter").on("keyup", function () {
        if ($("#inputParameter").val() === "") {
            $("#search").prop("disabled", true);
        } else {
            $("#search").prop("disabled", false);
        }
        console.log($("#inputParameter").val());

    });

    //switches gifs between still and animated states
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        var still = $(this).attr("data-still");
        var animate = $(this).attr("data-animate");

        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }
        
    })

    //adds to the number of gifs displayed
    $("#addGifs").on("click", function () {
        num += parseInt($("#numberParameter").val());
        $("#numberParameter").val("");
        $("#gifs-appear-here").empty();
        $("#gifs-appear-here").css("border", "none");
        $("#spaces").show();
        console.log(num);
    });

    $(document.body).on("click", ".gifButton", function () {

        var movie = $(this).attr("data-movie");
        var movieTag = $(this).attr("data-param2");
        $("#spaces").hide();

        //calls 10 gifs by default or else however many have been added with num
        if (num === 0) {
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=animation+" +
                movie + "+" + movieTag + "&rating=PG-13&api_key=dc6zaTOxFJmzC&limit=10";
        } else {
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=animation+" +
                movie + "+" + movieTag + "&rating=PG-13&api_key=dc6zaTOxFJmzC&limit=" + (10 + num);
        }
        var queryURL2 = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";


        $.when(
            $.ajax({
                url: queryURL,
                method: "GET"
            }), $.ajax({
                url: queryURL2,
                method: "GET"
            })).then(function (response1, response2) {
                //empties gifs every time a new button is clicked
                $("#gifs-appear-here").empty();

                //adds border when gifs are generated
                $("#gifs-appear-here").css("border-left", "2px solid black");
                $("#gifs-appear-here").css("border-top", "2px solid black");
                $("#gifs-appear-here").css("border-right", "2px solid black");
                console.log(response1[0]);
                console.log(response2[0]);

                // make a variable named results and set it equal to response.data

                var results = response1[0].data;
                var results2 = response2[0];


                //if the OMDb results include Animation as the genre, then a title, year, and plot are added
                if (results2.Genre.search("Animation") !== -1) {

                    var headerRow = $("<div class='row'>");
                    var rowTitle = $("<h3>");
                    rowTitle.text(results2.Title);
                    var rowYear = $("<h5>");
                    rowYear.html("(" + results2.Year + ")" + "<br>");

                    var rowPlot = $("<p>");
                    rowPlot.html(results2.Plot + "<br>");

                    $("#gifs-appear-here").prepend(rowTitle);
                    $("#gifs-appear-here").append(rowYear);
                    $("#gifs-appear-here").append(rowPlot);
                };

                var rowDiv = $("<div class='row'>");

                for (var i = 0; i < results.length; i++) {
                    // Makes a column
                    var col = $("<div class='col-md-4 col-sm-12 col'>");

                    // Makes a div to hold the gif
                    var gifDiv = $("<div class='gifDiv'>");

                    // Makes an image tag with jQuery and stores it in a variable with class "gif"
                    var movieImage = $("<img class='gif'>");
                    movieImage.attr("data-state", "still");
                    movieImage.attr("data-still", results[i].images.fixed_height_still.url);
                    movieImage.attr("data-animate", results[i].images.fixed_height.url);

                    // Adds gif and rating underneath to each gifDiv
                    gifDiv.append(movieImage);
                    gifDiv.append("<br><p class='rating'>Rating: " + results[i].rating.toUpperCase() + "</p>");
                    col.append(gifDiv);

                    // Set the image's src to results[i]'s fixed_height_still.url.
                    movieImage.attr("src", results[i].images.fixed_height_still.url);

                    // Appends the column to the row
                    rowDiv.append(col);

                    // Prepend the rowDiv to the element with an id of gifs-appear-here.
                    $("#gifs-appear-here").append(rowDiv);
                }



            });
    });

    $(document.body).on("dblclick", ".gifDiv", function () {
        $(this).detach();
        $("#favorites").append(this);
        $("#clearFavorites").show();
        console.log(this);
    });

    $("#clearFavorites").on("click", function () {
        $("#favorites").empty();
        $("#clearFavorites").hide();
    });


//timer functions for enabling double-click for touchscreens
    var number = 0;

    var intervalId;

    $(document.body).on("click", ".gifDiv", function(){
        if(number > 0 && number < 5){
            $(this).detach();
        $("#favorites").append(this);
        $("#clearFavorites").show();
        console.log(this);
        }
        run();
        console.log(number);
    });

    function run() {
      clearInterval(intervalId);
      intervalId = setInterval(increment, 100);
    }

    function increment() {
      number++;
      if (number === 10) {
        number = 0;
        stop();
      }
    }

    function stop() {
      clearInterval(intervalId);
    }

});

//APIKey = L115xTWOsSPV1ZQ1wRJcMmMqjoX52pCT