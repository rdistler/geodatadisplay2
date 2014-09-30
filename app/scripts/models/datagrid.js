"use strict";

function DataGrid() {
    this.name = "grid";
    this.datasets = {};

}
DataGrid.prototype.removeDataset = function(dataset) {
    this.grid.data = [];
    this.displayDataset(dataset);
}

DataGrid.prototype.displayDataset = function(dataset) {

    /*
	Add dataset to list of datasets managed by the datagrid
	 */
    var datasetName = dataset.name;
    if (!this.datasets[dataset.name]) {
        this.datasets[dataset.name] = {};

    }

    var rows2Display = [];
    angular.forEach(this.datasets, function(value) {
        if (dataset.displayed) {
            if (!this.datasets[datasetName].rows) {
                this.datasets[datasetName].rows = buildrows.apply(this, [dataset]);
            }

            if (this.grid.data instanceof Array) {
                this.grid.data = this.grid.data.concat(this.datasets[datasetName].rows);
            } else {
                this.grid.data = this.datasets[datasetName].rows;
            }   
        }
    }, this);


    function buildrows(dataset) {
        var rows = [];
        angular.forEach(dataset.filtered.features, function(value, key) {
            var recordObj = {};
            recordObj.name = value.properties[dataset.column_mapping.name];
            recordObj.address = value.properties[dataset.column_mapping.address];
            rows.push(recordObj);
        });

        return rows;
    }


}