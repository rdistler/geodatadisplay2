function Map() {
    this.name = "geodatadisplaymap model";
    this.map;
    this.layers = {};

}

Map.prototype.displayDataset = function(dataset) {
    console.log(dataset);
    var markers = [];
    var datasetName = dataset.name;
    if (!this.layers[dataset.name]) {
        var datasetLayer = this.layers[dataset.name] = {};
        datasetLayer.markers = {};
    }

    angular.forEach(dataset.filtered.features, function(value, key) {
        if (this.layers[dataset.name].markers[value.id]) {
            console.log('marker is already built, just return it');
            markers.push({});
        } else {
            console.log('building marker');
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]),
                title: value.id
            });
            this.layers[dataset.name].markers[value.id] = marker;

            markers.push(marker);
        }
    }, this);
    this.google_map.mc.addMarkers(markers);

    console.log(markers);

}

// This should be incorporated into the displayDataset function
Map.prototype.addGeoJSONlayer = function(geoJSON) {
    this.map.data.addGeoJson(geoJSON);
}