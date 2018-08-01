

$(document).ready(function(){ 

    var topics = ["puppies", "cats", "Jumanji"];

    function makeB() {                                                                      // Create the buttons
        $(".buttonMe").empty();                                                             // Makes sure there are no duplicates
        for (var i = 0; i < topics.length; i++) {                                           // Loop through the 'topics' array
            var butHtml = $("<button>");                                                    // Create an HTML button
            butHtml.addClass("gifMeUp");                                                    // Add a div class called 'gifMeUp' to each button
            butHtml.text(topics[i]);                                                        // Push the string from the array to the button that was created for it
            butHtml.attr("data-name", topics[i]);                                           // Add a data attribute
          $(".buttonMe").append(butHtml);                                                   // Add the buttons to the 'buttonMe' div
        }
    }

    makeB();                                                                                // Call the function to make the buttons

    function doTheWork() {                                                                  // Function for the AJAX call and click event for the gifs
        $(".gifMe").empty();                                                                // Clear the previous Gifs
        var whoIbe = $(this).attr("data-name");                                             // Pull the name of the button from the data-name attribute
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + whoIbe +"&api_key=9OITCt8vj9Ey0OaPr8PoA9Qo3JAL9gxx&limit=16&rating=pg-13"; // giphy API URL

        $.ajax({                                                                            // AJAX request
            url: queryURL,                                                                  // Call the URL stored in var queryURL
            method: "GET"                                                                   // Use 'GET'
        }).then(function(response) {                                                        // Wait until the request is complete, store in 'response'
            
            console.log(response);                                                          // Show me the data from the AJAX request at the console

            var results = response.data;                                                    // Create variable 'results' to hold resonse.data  
                for (var  j= 0; j < results.length; j++) {                                  // For Loop through the 10 results
                    var gifDiv = $("<div class='gifMeUp2'>");                               // Create a div class called 'gifMeUp2'
                    var rating = results[j].rating;                                         // Variable to hold the gif rating
                    var p = $("<p>").text("Gif Rating: " + rating.toUpperCase());           // Push the rating to the HTML in Uppercase
                    var newImg = $("<img>");                                                // Create an IMG HTML element
                    newImg.attr("src", results[j].images.fixed_height_still.url);           // Give a still image as the source
                    newImg.attr("data-still", results[j].images.fixed_height_still.url);    // Assign the still image to 'data-still'
                    newImg.attr("data-animate", results[j].images.fixed_height.url);        // Assign the moving image to date-animate'
                    newImg.attr("data-state", "still");                                     // Assign attr data-state 'still'
                    newImg.addClass("gif");                                                 // Add div class 'gif' to the new images
                    gifDiv.prepend(p);                                                      // Add the rating to the gif's div
                    gifDiv.prepend(newImg);                                                 // Add the IMG element and source to the gif's div
                    $(".gifMe").prepend(gifDiv);                                            // Push to the HTML
                }
                $(".gif").on("click", function() {                                          // On "gif" div click event
                    var state = $(this).attr("data-state");
                        if (state === "still") {                                            // If attr data-state is 'still'
                            $(this).attr("src", $(this).attr("data-animate"));              // Change the image source to the moving image
                            $(this).attr("data-state", "animate");                          // and set attr data-state to 'animate'
                        } else {                                                            // Else (data-state is set to animate)
                            $(this).attr("src", $(this).attr("data-still"));                // Change the image source to the still image
                            $(this).attr("data-state", "still");                            // and set attr data-state to 'still'
                        }    
                        return false;                                                       // Stop this click from bubbling up and sending a new AJAX request
                    })               
        });  
    };

    $(document).on("click", ".gifMeUp" , doTheWork);                                        // Click event for the buttons, calls the 'doTheWork' function
   
    $(document).on("mouseenter", ".gifMeUp", function() {                                   // On mouse hover change the button text to red
        $(this).css("color", "red");
        });

    $(document).on("mouseleave", ".gifMeUp", function() {                                   // Change the button text back to blue
        $(this).css("color", "darkblue");
    });

    $("form").submit(function(){                                                            // Click event for the form
        event.preventDefault();                                                             // Prevent default form action
        var newValue = $(".addMe").val().trim();                                            // Get the trimmed input
        topics.push(newValue);                                                              // Add the input to the 'topics' array
        makeB();                                                                            // Call the 'makeB' function to create a new button
        this.reset();                                                                       // Clear the form input
    });
});
