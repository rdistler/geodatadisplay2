function Map() {
    this.name = "geodatadisplaymap model";
    this.map;

}

Map.prototype.addGeoJSONlayer = function(geoJSON) {
    this.map.data.addGeoJson(geoJSON);
}