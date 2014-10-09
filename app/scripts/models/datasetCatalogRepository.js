"use strict";

function DatasetCatalogRepository(){
    this.catalogs = {};

    this.addDatasetCatalog = function(catalog){
        this.catalogs[catalog.name] = catalog;
    }
}