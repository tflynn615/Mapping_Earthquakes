// Add console log to confirm its working 
console.log("working"); 

// Create the map object with a center and zoom level 
//let map = L.map('mapid').setView([40.7, -94.5], 4); 

// Create the map object with a center and zoom level.
let map = L.map("mapid", {
    center: [
      40.7, -94.5
    ],
    zoom: 4
  });


// Create a tile layer 
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//  Add a marker to the map for Los Angeles, California.
let marker = L.marker([34.0522, -118.2437]).addTo(map);

// L.circle([34.0522, -118.2437], {
//   radius: 300,
//   fillColor: 'lightyellow', 
//   color: 'black'
// }).addTo(map);

L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    fillColor: 'lightyellow', 
    color: 'black'
  }).addTo(map);