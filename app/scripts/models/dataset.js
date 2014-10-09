'use strict';

/**
 * @class  DatasetModel
 * @constr
 * @return {DatasetModel}
 * This is an entity object because can be identified by the dataset name
 * This will use Angulars factory recipe
 */

function Dataset($http, $q) {
    this.name;
    this.src;
    this.data; //used to store raw json 
    this.description;
    this.icon;
    this.q = $q;
    this.http = $http;

}

Dataset.prototype.filter = function() {
    var defer = this.q.defer();
    var _this = this;
    this.getGeoJSON().then(function(geoJSON){
        _this.filtered = geoJSON;
        defer.resolve(_this);
    })
    

    return defer.promise;
};




/**
 * @function getData
 * @return {json}
 * @memberof DatasetModel
 * @instance
 */
Dataset.prototype.getData = function() {
    var defer = this.q.defer();

    var _this = this;

    if(this.data){
        defer.resolve(this.data);
    }
    this.http.jsonp(this.src + '?$jsonp=JSON_CALLBACK').
    success(function(data, status, headers, config) {
        _this.data = data;

        // set columns property
        var columns = [];
        var columnsByName = {};
        for (var i = 0; i < data.meta.view.columns.length; i++) {
            var column = data.meta.view.columns[i];
            if (column.id != -1) {
                column.positionInArray = i;
                columns.push(column);
                columnsByName[column.fieldName] = column;
            }
        }
        _this.columns = columns;
        _this.columnsByName = columnsByName;
        defer.resolve(data);
    }).
    error(function(data, status, headers, config) {
        console.log('There was an error with the request');
    });
    return defer.promise;
}

// /**
//  * @function
//  * @name  getColumns
//  * @description  Uses a Promise to returns an array with the name of columns in this dataset
//  * @memberof DatasetModel
//  * @instance
//  * @return array of Column objects
//  */
// Dataset.prototype.getColumns = function(){
//     var defer = this.q.defer();
//     this.getData().then(function(data) {
//         var columns = [];
//         for (var i = 0; i < data.meta.view.columns.length; i++) {
//             var column = data.meta.view.columns[i];
//             if (column.id != -1) {
//                 column.positionInArray = i;
//                 columns.push(column);
//             }
//         }
//         defer.resolve(columns);
//     });
//     return defer.promise;
// }

Dataset.prototype.getGridData = function($scope) {
    var defer = this.q.defer();
    var dataset = this;
    if (dataset.arrayOfObjects) {
        defer.resolve(dataset.arrayOfObjects);
    } else {
        this.getData().then(function() {
            var result = [];
            angular.forEach(dataset.data.data, function(recordArray) {
                var recordObj = {};
                recordObj.name = recordArray[dataset.columnsByName[dataset.column_mapping.name].positionInArray];
                recordObj.address = recordArray[dataset.columnsByName[dataset.column_mapping.address].positionInArray];
                result.push(recordObj);
            });
            defer.resolve(result);
        });
    }
    return defer.promise;
}


/**
 * @function
 * @name getGeoJSON
 * @description Return dataset as a geoJSON object
 * @memberof DatasetModel
 * @instance
 *
 */
Dataset.prototype.getGeoJSON = function() {
    var defer = this.q.defer();

    this.getData().then(function(data) {
        var json = {};

        json.bbox = [];
        json.crs = {};
        json.features = [];
        json.type = 'FeatureCollection';

        var columns = [];
        for (var i = 0; i < data.meta.view.columns.length; i++) {
            var column = data.meta.view.columns[i];
            if (column.id != -1) {
                column.positionInArray = i;
                columns[column.fieldName] = column;

                // Check to see if this is a location column
                if (column.dataTypeName == "location") {
                    var locationColumn = column;
                }
            }
        }

        //this.columns = columns;

        for (var x = 0; x < data.data.length; x++) {

            var feature = {};
            feature.type = 'Feature';
            feature.id = data.data[x][1];
            feature.geometry = {};
            feature.geometry.type = "Point";
            feature.geometry_name = "geo_point";
            feature.geometry.coordinates = [];
            feature.properties = {};
            if (locationColumn) {
                feature.geometry.coordinates.push(parseFloat(data.data[x][locationColumn.positionInArray][2]));
                feature.geometry.coordinates.push(parseFloat(data.data[x][locationColumn.positionInArray][1]));
            }
            else if(_.has(columns,'latitude') && _.has(columns,'longitude')){
                feature.geometry.coordinates.push(parseFloat(data.data[x][columns['longitude'].positionInArray]));
                feature.geometry.coordinates.push(parseFloat(data.data[x][columns['latitude'].positionInArray]));
            }
            // else if(_.contains(columns, value) )
            console.log('Contains latitude ' + _.has(columns, 'latitude'));

            for (column in columns) {
                feature.properties[column] = data.data[x][columns[column].positionInArray];
            }

            if (feature.geometry.coordinates[0] != null && feature.geometry.coordinates[1] != null) {
                json.features.push(feature);
            }

        }
        defer.resolve(json);
    })


    return defer.promise;
}