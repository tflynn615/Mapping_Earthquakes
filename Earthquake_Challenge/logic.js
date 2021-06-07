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

// Create the earthquake layer for map 
let earthquakes = new L.layerGroup(); 

let overlays = {
    Earthquakes: earthquakes
}; 


let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
}); 

L.control.layers(baseMaps, overlays).addTo(map);


function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1, 
        fillColor: getColor(feature.properties.mag),
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

function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  console.log(data);

  L.geoJson(data, {

      pointToLayer: function(feature, latlng) {
          console.log(data); 
          return L.circleMarker(latlng);
      },
      style: styleInfo, 
      onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br> Location: " + feature.properties.place); 
      }
  }).addTo(earthquakes); 

  earthquakes.addTo(map);
})

// Creating a legend 

let legend = L.control({
    position: "bottomright"
}); 

legend.onAdd = function(map) {
    let div = L.DomUtil.create("div", "info legend"); 
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
    ];
    // Looping through our intervals to generate a label with a colored square for each interval.
   for (var i = 0; i < magnitudes.length; i++) {
     console.log(colors[i]);
     div.innerHTML +=
       "<i style='background: " + colors[i] + "'></i> " +
       magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;

};

legend.addTo(map);