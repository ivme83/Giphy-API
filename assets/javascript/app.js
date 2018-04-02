var page = {

    createBtnRow: function(arr) {
        $("#btn-col").empty();

        //var newRow = $("<div>");
        //newRow.addClass("row");

        // Working here
        for (var i = 0; i < arr.length; i++) {
            var newCol = $("<div>");
            newCol.addClass("col-sm-6");
            var btn = $("<button>");
            btn.attr("type", "button");
            btn.addClass("btn btn-primary btn-lg gif-btn");
            btn.attr("data-value", arr[i]);
            btn.text(arr[i]);

            newCol.append(btn);
        }
        newRow.append(newCol);
        
        $("#btn-col").append(newRow);
    }
}

var searchAPI = {
    results: 5,

    searchGiphy: function(qy, r) {
        this.results = r;
       
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + qy + "&api_key=dc6zaTOxFJmzC&limit=" + this.results;
        
        $.ajax({
          url: queryUrl,
          method: 'GET',
        }).then(function(response){
            searchAPI.drawResults(response);
        });
    },

    drawResults: function(obj) {
        var resp = obj;
        console.log(resp);
               
        var resultsDiv = $("<div>");
        resultsDiv.addClass("results-main");
        
        for (var i = 0; i < this.results; i++) {
            var imgDiv = $("<img>");
            imgDiv.addClass("gif");
            imgDiv.attr("src", resp.data[i].images.fixed_height_small_still.url);
            imgDiv.attr("data-still", resp.data[i].images.fixed_height_small_still.url);
            imgDiv.attr("data-animate", resp.data[i].images.fixed_height_small.url);
            imgDiv.attr("data-state", "still");

            var panelDiv = $("<div>");
            panelDiv.addClass("panel panel-primary");
            var headerDiv = $("<div>");
            headerDiv.addClass("panel-heading");
            headerDiv.text(resp.data[i].title);
            var bodyDiv = $("<div>");
            bodyDiv.addClass("panel-body text-center");
            var footerDiv = $("<div>");
            footerDiv.addClass("panel-footer text-center");
            var spanDiv = $("<span>");
            spanDiv.addClass("badge");
            spanDiv.text(resp.data[i].rating);

            footerDiv.append(spanDiv);
            bodyDiv.append(imgDiv);
            panelDiv.append(headerDiv);
            panelDiv.append(bodyDiv);
            panelDiv.append(footerDiv);

            resultsDiv.append(panelDiv);

        }

        $("#gif-col").append(resultsDiv);
    }

}


var btnArrays = {
    theme1: ["Doctor Who", "Tardis", "Peter Capaldi", "Matt Smith", "Dalek", "Time Lord"],
    theme2: ["plate", "cup", "bowl", "fork", "spoon", "knife"],

    returnArr: function(which) {
        switch (which) {
            case 1:
                return this.theme1;
                break;
            case 2:
                return this.theme2;
                break;
        }
    },

    pushToArr: function(which, newItem) {
        switch (which) {
            case 1:
                this.theme1.push(newItem);
                break;
            case 2:
                this.theme2.push(newItem);
                break;
        }
    }

}



page.createBtnRow(btnArrays.returnArr(1));

$(document).on("click", ".gif-btn", function() {
    var query = $(this).attr("data-value");
    searchAPI.searchGiphy(query, 10);
});

$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$("#run-add").on("click", function(event) {
    event.preventDefault();

    var userItem = $("#add-item").val().trim();

    if (!(userItem === "")) {
        var tempArr = btnArrays.returnArr(1);
        if (tempArr.indexOf(userItem) === -1) {
            btnArrays.pushToArr(1, userItem);
            page.createBtnRow(btnArrays.returnArr(1));      
        }
    }
});

$("#clear-all").on("click", function(event) {
    event.preventDefault();
    $("#gif-col").empty();
});