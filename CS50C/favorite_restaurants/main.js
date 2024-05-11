/* Students: Please use this week's project for Week 9: Midterm Project: Map-Based Mobile App.
     You will need to replace the contents of this JavaScript file with your own work,
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in both Repl.it and Canvas to be graded. */




let myzoom = 9;
let mymap = L.map('map1')
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);

function addMarkers(data){
    var bounds = L.latLngBounds([[data[0].lat, data[0].lng],
                    [data[0].lat, data[0].lng]]);
    for (i=0;i < data.length;i++) {

        console.log(data[i]);
        mymarker = L.marker( data[i] );
        mymarker.addTo(mymap);
        var latlng = [data[i].lat, data[i].lng];
        bounds.extend(L.latLng(latlng));
        mymarker.bindPopup("<strong>" + data[i].title + "</strong><br>My favorite thing to order is: "+data[i].favorite_dish).openPopup();
    }
    mymap.fitBounds( bounds );
}

var juniper = L.icon({

    iconUrl: 'Juniper.png',

    iconSize:     [50, 95], // size of the icon
    iconAnchor:   [45, 0], // point of the icon which will correspond to marker's location
});

function updateOnCurrentLoc(position){
    var currentBounds = mymap.getBounds()
    console.log(position);
    var latlng =[position.coords.latitude, position.coords.longitude];
    mymarker = L.marker( latlng, {icon: juniper} );
    mymarker.addTo(mymap);
    mymarker.bindPopup("You are here!")
    mymarker.openPopup()
    currentBounds.extend(L.latLng(latlng));
    currentBounds = currentBounds.pad(0.1);
    mymap.fitBounds(currentBounds);

}

function noCurrentLoc(){
    console.log("Could not retrieve location");
}

const currentOptions = {
    enableHighAccuracy: true,
    maximumAge: 5000,
    timeout: 27000,
};


function addCurrentLocationMarker(event) {
    navigator.geolocation.getCurrentPosition(updateOnCurrentLoc, noCurrentLoc, currentOptions);
}

$.getJSON("restaurants.json", addMarkers);
$("#show-loc").click(addCurrentLocationMarker)