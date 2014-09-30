"use strict";
/**
 * @class  DisplayManager
 * This is an aggregate object
 */


function DisplayManager(map, datasetRepository,datagrid) {
    this.map = map;
    this.datagrid = datagrid;
    this.datagrid.grid = {
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

    this.datasetRepository = datasetRepository;

    this.displayMapLayer = function(data) {
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
        .then(function(dataset) {
            console.log('Displaying grid');
            _this.datagrid.displayDataset.apply(_this.datagrid, [dataset]);
            return dataset;
        })
        .then(function(dataset) {
            _this.map.displayDataset.apply(_this.map, [dataset]);
            return dataset;
        });


    dataset.displayed = true;
}

DisplayManager.prototype.removeDataset = function(dataset) {

    console.log('Removing dataset');
    dataset.displayed = false;
    var _this = this;
    _this.map.removeDataset.apply(_this.map, [dataset]);
    _this.datagrid.removeDataset.apply(_this.datagrid, [dataset]);

    

}

DisplayManager.prototype.toggleDataset = function(dataset) {

    if (dataset.displayed) {
        this.removeDataset(dataset);
    } else {
        this.displayDataset(dataset);
    }
}