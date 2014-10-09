"use strict";

function DatasetRepository(util){
    this.datasets = [];
    this.util = util;
    // this.displayDataset = function(dataset) {
    //     console.log('Display dataset');
    //     console.log(dataset);
    //     if (!dataset.data) {
    //         dataset.getData();
    //     }
    // };

    this.addDataset = function(dataset){
        if(typeof dataset.icon !== 'object'){
            dataset.iconColor = util.randomColor();
            dataset.icon = MapIconMaker.createMarkerIcon({'primaryColor': dataset.iconColor});
        }
        this.datasets.push(dataset);
    }

}