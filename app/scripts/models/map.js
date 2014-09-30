"use strict";

function Map() {
    this.name = "geodatadisplaymap model";
    this.map;
    this.datasets = {};

}

Map.prototype.displayDataset = function(dataset) {
   // console.log(dataset);

    var datasetName = dataset.name;
    if (!this.datasets[dataset.name]) {
        var datasetLayer = this.datasets[dataset.name] = {};
        datasetLayer.markers = {};
    }

    this.datasets[dataset.name].filteredMarkers = [];

    angular.forEach(dataset.filtered.features, function(value, key) {
        if (this.datasets[dataset.name].markers[value.id]) {
            console.log('marker is already built, just return it');
            var marker = this.datasets[dataset.name].markers[value.id];
            this.datasets[dataset.name].filteredMarkers.push(marker);
        } else {
            console.log('building marker');
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(value.geometry.coordinates[1], value.geometry.coordinates[0]),
                title: value.id,
                icon: dataset.icon.icon.url
            });
            this.datasets[dataset.name].markers[value.id] = marker;

            this.datasets[dataset.name].filteredMarkers.push(marker);
        }
    }, this);

    // var clustericon = MapIconMaker.createFlatIcon({
    //     primaryColor : this.markerOptions.color,
    //     labelColor : '000000'
    // });
    // if (this.layerData.mapLayer.markerClustering == false) {
    //     clusterer = new mo.gov.NoMarkerClustering(mo.gov.GeoDataDisplay.geoDataMap.map);
    // } else {
    //     var markerCluster_options = {
    //         styles : [{
    //             url : clustericon.icon.url,
    //             height : 30,
    //             width : 30,
    //             textSize : 19
    //         }]
    //     };
    //     clusterer = new MarkerClusterer(mo.gov.GeoDataDisplay.geoDataMap.map, null, markerCluster_options);
    // }
    // 

    var clustericon = MapIconMaker.createFlatIcon({
        primaryColor: dataset.iconColor,
        labelColor: '000000'
    });

    var markerCluster_options = {
        styles: [{
            url: clustericon.icon.url,
            height: 30,
            width: 30,
            textSize: 19
        }]
    };

    if (!this.datasets[dataset.name].mc) {
        this.datasets[dataset.name].mc = new MarkerClusterer(this.google_map, null, markerCluster_options);
    }

    this.datasets[dataset.name].mc.addMarkers(this.datasets[dataset.name].filteredMarkers);

    console.log(this.datasets[dataset.name].filteredMarkers);

}

Map.prototype.removeDataset = function(dataset) {
    this.datasets[dataset.name].mc.removeMarkers(this.datasets[dataset.name].filteredMarkers);
}

// This should be incorporated into the displayDataset function
Map.prototype.addGeoJSONlayer = function(geoJSON) {
    this.map.data.addGeoJson(geoJSON);
}