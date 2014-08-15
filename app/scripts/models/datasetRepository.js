"use strict";

function DatasetRepository(){
    this.datasets = [];
    this.displayDataset = function(dataset) {
        console.log('Display dataset');
        console.log(dataset);
        if (!dataset.data) {
            dataset.getData();
        }
    };

    this.addDataset = function(dataset){
        this.datasets.push(dataset);
    }

}