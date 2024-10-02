$(document).ready(function () {
    var backgroundToggle = true;

    function getRandomImage(callback) {
        var apiKey = '4V73spW5KP6UUG6hDMaKiHtD8cLCfBmCvmh6xPxn3Cs';  

        $.getJSON(`https://api.unsplash.com/photos/random?client_id=${apiKey}`, function (data) {
            callback(data.urls.full);  
        });
    }

    function changeBackgroundImage() {
        getRandomImage(function (newImage) {
            $('body').css('background-image', `url(${newImage})`);
        });
    }

    $('#searchEngineName').on('click', function () {
        changeBackgroundImage();
    });

    function apiSearch(isLucky = false) {
        var params = {
            'q': $('#query').val(),
            'count': 10,
            'offset': 0,
            'mkt': 'en-us'
        };

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

                    for (var i = 0; i < len; i++) {
                        var result = data.webPages.value[i];
                        results += `<p><a href="${result.url}" target="_blank">${result.name}</a>: ${result.snippet}</p>`;
                    }

                    if (isLucky) {
                        
                        window.location.href = data.webPages.value[0].url;
                    } else {
                        $('#searchResults').html(results).dialog({
                            title: "Search Results",
                            width: 600,
                            modal: true
                        });
                    }
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

    $('#searchButton').on('click', function () {
        apiSearch();
    });

    $('#luckyButton').on('click', function () {
        apiSearch(true); 
    });

    $('#timeButton').on('click', function () {
        var currentTime = new Date();
        var formattedTime = currentTime.getHours() + ":" + (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();

        $('#time').html('Current time: ' + formattedTime).dialog({
            title: "Current Time",
            width: 300,
            modal: true
        });
    });
});
