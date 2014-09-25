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
        }, {
            field: "city",
            displayName: "City"
        }]
    };

    this.displayMapLayer = function(data){
        console.log(data);
    }

}

/**
 * @function displayDataset
 * @memberof DisplayManager
 * @instance
 */
DisplayManager.prototype.displayDataset = function(dataset) {
    console.log("Displaying dataset");
    var _this = this;

    dataset.filter()
    .then(function(dataset){
        _this.map.displayDataset.apply(_this.map, [dataset]);
    })
    .then(function(){
        console.log('Displaying grid');
    });

    //this.displayMapLayer();
    //this.displayGridLayer();


    // dataset.getGeoJSON().then(function(geoJSON) {
    //     _this.map.data.addGeoJson(geoJSON);
    // });

    // dataset.getGridData().then(function(data) {
    //     if (_this.grid.data instanceof Array) {
    //         _this.grid.data = _this.grid.data.concat(data);
    //     } else {
    //         _this.grid.data = data;
    //     }

    //     console.dir(_this.grid);
    // });
}