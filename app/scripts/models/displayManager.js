"use strict";
/**
 * @class  DisplayManager
 * This is an aggregate object
 */


function DisplayManager(map, datasetRepository) {
    this.map = map;
    this.datasetRepository = datasetRepository;
    this.grid = {
        columnDefs: [{
            field: "dbaname",
            displayName: "Name"
        }, {
            field: "license_number",
            displayName: "Number"
        }]
    };

}

/**
 * @function displayDataset
 * @memberof DisplayManager
 * @instance
 */
DisplayManager.prototype.displayDataset = function(dataset) {
    console.log("Displaying dataset");
    var _this = this;

    // dataset.getGeoJSON().then(function(geoJSON) {
    //     _this.map.addGeoJSONlayer(geoJSON);
    // });

    dataset.getDataForDataTable().then(function(data) {
        _this.grid.data = data;
        console.dir(_this.grid);
    });
}