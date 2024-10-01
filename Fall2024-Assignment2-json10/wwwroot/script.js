// to ensure the dom is fully loaded before running scripts
$(document).ready(function () {

    // when using bing api search
    function apiSearch() {
        var params = {
            'q': $('#query').val(), 
            'count': 10,            
            'offset': 0,            
            'mkt': 'en-us'         
        };

        // making the api call
        $.ajax({
            url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
            type: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': '4cc27553708f4278ac70b628723862df' 
            }
        })
            .done(function (data) {
                if (data.webPages && data.webPages.value.length > 0) {
                    var len = data.webPages.value.length;
                    var results = '<h2>Search Results:</h2>';

                    // looping results and building the content
                    for (var i = 0; i < len; i++) {
                        var result = data.webPages.value[i];
                        results += `<p><a href="${result.url}" target="_blank">${result.name}</a>: ${result.snippet}</p>`;
                    }

                    $('#searchResults').html(results).dialog({
                        title: "Search Results",
                        width: 600,
                        modal: true
                    });
                } else {
                    $('#searchResults').html('<p>No results found.</p>').dialog({
                        title: "Search Results",
                        width: 400,
                        modal: true
                    });
                }
            })
            .fail(function () {
                alert('Error occurred while fetching search results.');
            });
    }

    // to bind the search button click event to the apiSearch function
    $('#searchButton').on('click', apiSearch);

    // shows current time when 'time' button is clicked
    $('#timeButton').on('click', function () {
        var currentTime = new Date();
        var formattedTime = currentTime.getHours() + ":" + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();

        $('#time').html('Current time: ' + formattedTime).dialog({
            title: "Current Time",
            width: 300,
            modal: true
        });
    });

    // changes the background when clicking the search engine name
    $('#searchEngineName').on('click', function () {
        var currentBackground = $('body').css('background-image');
        var newBackground = currentBackground.includes('unsplash.com') ?
            'url(https://source.unsplash.com/random/1600x900)' :
            'url(https://source.unsplash.com/random/1600x901)';  // toggles between two random Unsplash images

        $('body').css('background-image', newBackground);
    });
});
