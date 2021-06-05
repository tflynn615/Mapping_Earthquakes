// Add console log to confirm its working 
console.log("working"); 

// Create a tile layer
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

let satellitestreets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
});

let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satellitestreets
};

let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [streets]
}); 

L.control.layers(baseMaps).addTo(map);

let torontoHoods = "https://raw.githubusercontent.com/tflynn615/Mapping_Earthquakes/main/torontoNeighborhoods.json";

let myStyle = {
  color: "blue", 
  fillColor: "yellow",
  weight: 1
};

d3.json(torontoHoods).then(function(data) {
  console.log(data);

  L.geoJson(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      console.log(layer); 
      layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME + "</h2>");
    }
  }).addTo(map); 
});