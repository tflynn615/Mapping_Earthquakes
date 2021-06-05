// Add console log to confirm its working 
console.log("working"); 

// Create a tile layer
let night = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/navigation-night-v1",
    accessToken: API_KEY
});

let day = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/navigation-day-v1",
    accessToken: API_KEY
});

let baseMaps = {
  Night: night,
  Day: day
};

let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [night]
}); 

L.control.layers(baseMaps).addTo(map);

let torontoData = "https://raw.githubusercontent.com/tflynn615/Mapping_Earthquakes/main/torontoRoutes.json";

let myStyle = {
  color: "#ffffa1", 
  weight: 2
};

d3.json(torontoData).then(function(data) {
  console.log(data);

  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      console.log(layer); 
      layer.bindPopup("<h2> Airline: " + feature.properties.airline + "</h2> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");
    }
  }).addTo(map); 
});