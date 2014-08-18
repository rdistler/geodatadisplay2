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
            field: "name",
            displayName: "Name"
        }, {
            field: "address",
            displayName: "Address"
        },
        {
            field:"city",
            displayName: "City"
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

    dataset.getGeoJSON().then(function(geoJSON) {
        _this.map.data.addGeoJson(geoJSON);
    });

    dataset.getDataForDataTable().then(function(data) {
        _this.grid.data = data;
        console.dir(_this.grid);
    });
}