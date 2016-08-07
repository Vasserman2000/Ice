
$(document).on('mobileinit', function () {
    $.mobile.defaultPageTransition = "slide";
});


$(document).on("pageinit", "#index", function (event) {
    $("#slideshow > div:gt(0)").hide();

    setInterval(function () {
        $('#slideshow > div:first')
          .fadeOut(1000)
          .next()
          .fadeIn(1000)
          .end()
          .appendTo('#slideshow');
    }, 3000);
});

//$(document).on("pageinit", "#index", function () {
//    WebServiceURL = "IceWS.asmx";
//    $.support.cors = true;
//    $.ajax({
//        url: WebServiceURL + "/CurrentDateAndTime",
//        dataType: "json",
//        type: "POST",
//        data: "{ }",
//        contentType: "application/json; charset=utf-8",
//        error: function (err) {
//            alert("error: " + JSON.stringify(err));
//        },
//        success: function (data) {
//            $("#head").html("<font size='1.5'>" + data["d"][0] + "</font>&nbsp; &nbsp; &nbsp;" + " <font color='red'> Ice Cream Store </font>&nbsp; &nbsp; &nbsp;" + "<font size='1.5'>" + data["d"][1] + "</font>");
//        }
//    });
//});

function clickme() {
    $.mobile.changePage("#map-page", { 'transition': 'flip' });
}

$(document).on("pageshow", "#map-page", function () {
    var defaultLatLng = new google.maps.LatLng(32.275779, 34.920814);
    drawMap(defaultLatLng);  // No geolocation support, show default map
});


function drawMap(latlng) {
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

    // Add an overlay to the map of current lat/lng
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: "Greetings!"
    });
}



$(document).on("pageshow", "#branches", function (event) {
    WebServiceURL = "IceWS.asmx";
    $.support.cors = true;
    $.ajax({
        url: WebServiceURL + "/GetYepBranches",
        dataType: "json",
        type: "POST",
        data: "{ }",
        contentType: "application/json; charset=utf-8",
        error: function (err) {
            alert("error: " + JSON.stringify(err));
        },
        success: function (data) {
            var kosher = "", size = JSON.parse(data["d"]).length;
            if ($('#list').is(':empty')) {
                for (var i = 0; i < size; i++) {
                    ((JSON.parse(data["d"]))[i].Kosher) ? kosher = "Kosher" : kosher = "Not Kosher";
                    geoLocation = new google.maps.LatLng((JSON.parse(data["d"]))[i].Longitude, (JSON.parse(data["d"]))[i].Latitude);
                    $('#list').append('<div data-role="collapsible" data-collapsed="false" id="block' + i + '" data-collapsed="true" data-collapsed-icon="carat-r" data-expanded-icon="carat-d"><h3>Title</h3><p>Content</p></div>');
                    $('#block' + i + ' > h3').html('<img src=' + (JSON.parse(data["d"]))[i].Photo + ' style="width:120px; height:120px; vertical-align:middle;"  /> <span style="margin:   35px  !important;"></span>' + (JSON.parse(data["d"]))[i].BranchName);
                    $('#block' + i + ' > p').html((JSON.parse(data["d"]))[i].Address + '<br>' + (JSON.parse(data["d"]))[i].MidWeek + ': ' + (JSON.parse(data["d"]))[i].MidWeekOpenHours + '<br>' + (JSON.parse(data["d"]))[i].Weekend + ': ' + (JSON.parse(data["d"]))[i].WeekendOpenHours + '<br><b>' + kosher + '</b><br>Telephone: ' + (JSON.parse(data["d"]))[i].Telephone + '<br>Manager: ' + (JSON.parse(data["d"]))[i].Manager + '<div id="map' + i + '"></div>');
                    $('#block' + i + ' > p').css("font-family", "Lucida Console");
                    $('#list').collapsibleset('refresh');
                    var lat = (JSON.parse(data["d"]))[i].Latitude;
                    var long = (JSON.parse(data["d"]))[i].Longitude;
                    var loc = new google.maps.LatLng(long, lat);
                    var myOptions = {
                        zoom: 15,
                        center: loc,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("map" + i), myOptions);
                    google.maps.event.trigger(map, 'resize');
                    map.setZoom(map.getZoom());
                }
            }
        }
    });
});

function addProd () {
    if ($('#Text1').val()) {
        WebServiceURL = "IceWS.asmx";
        $.support.cors = true;
        $.ajax({
            url: WebServiceURL + "/addProduct",
            dataType: "json",
            type: "POST",
            data: "{'ProductName':'" + ($('#Text1').val()).toString() + "'}",
            contentType: "application/json; charset=utf-8",
            error: function (err) {
                alert("error: " + JSON.stringify(err));
            },
            success: function (data) {
                alert("Successfully added " + data["d"] + "rows");
            }
        });
    }
}

function getProds() {
    WebServiceURL = "IceWS.asmx";
    $.support.cors = true;
    $.ajax({
        url: WebServiceURL + "/getProducts",
        dataType: "json",
        type: "POST",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        error: function (err) {
            alert("error: " + JSON.stringify(err));
        },
        success: function (data) {
            $('#TextArea1').css('visibility', 'visible');
            $('#TextArea1').css('height', (parseInt(JSON.parse(data["d"]).length, 10)*25).toString());
            $('#TextArea1').text(data["d"]);
            var count = 0;
            for (var i = 0; i < JSON.parse(data["d"]).length; i++)
                //if ((JSON.parse(data["d"]))[i].)
                //alert(data["d"])
                alert(Object.keys(data["d"])[i])
        }
    });
}


function addFlavor() {
    if ($('#Text2').val()) {
        WebServiceURL = "IceWS.asmx";
        $.support.cors = true;
        $.ajax({
            url: WebServiceURL + "/addFlavor",
            dataType: "json",
            type: "POST",
            data: "{'Flavor':'" + ($('#Text2').val()).toString() + "'}",
            contentType: "application/json; charset=utf-8",
            error: function (err) {
                alert("error: " + JSON.stringify(err));
            },
            success: function (data) {
                alert("Successfully added " + data["d"] + "rows");
            }
        });
    }
}


function getFlavors() {
    WebServiceURL = "IceWS.asmx";
    $.support.cors = true;
    $.ajax({
        url: WebServiceURL + "/getFlavors",
        dataType: "json",
        type: "POST",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        error: function (err) {
            alert("error: " + JSON.stringify(err));
        },
        success: function (data) {
            $('#TextArea2').css('visibility', 'visible');
            $('#TextArea2').css('height', (parseInt(JSON.parse(data["d"]).length, 10) * 25).toString());
            $('#TextArea2').text(data["d"]);
        }
    });
}

