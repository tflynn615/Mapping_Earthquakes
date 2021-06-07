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
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
}); 

L.control.layers(baseMaps).addTo(map);


function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1, 
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true, 
        weight: 0.5
};
}

function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  console.log(data);

  L.geoJson(data, {

      pointToLayer: function(feature, latlng) {
          console.log(data); 
          return L.circleMarker(latlng);
      },
      style: styleInfo
  }).addTo(map); 
})