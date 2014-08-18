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

}

/**
 * @function getData
 * @return {json}
 * @memberof DatasetModel
 * @instance
 */
Dataset.prototype.getData = function() {
    var defer = this.q.defer();

    var _this = this;

    this.http.jsonp(this.src + '?$jsonp=JSON_CALLBACK').
    success(function(data, status, headers, config) {
        _this.data = data;

        // set columns property
        var columns = [];
        for (var i = 0; i < data.meta.view.columns.length; i++) {
            var column = data.meta.view.columns[i];
            if (column.id != -1) {
                column.positionInArray = i;
                columns.push(column);
            }
        }
        _this.columns = columns;
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

Dataset.prototype.getDataForDataTable = function($scope) {
    var defer = this.q.defer();
    var dataset = this;
    if (dataset.arrayOfObjects) {
        defer.resolve(dataset.arrayOfObjects);
    } else {
        this.getData().then(function() {
            var result = [];
            angular.forEach(dataset.data.data, function(recordArray) {
                var recordObj = {};
                for (var x = 0; x < dataset.columns.length; x++) {
                    var column = dataset.columns[x];
                    recordObj[column.fieldName] = recordArray[column.positionInArray]
                }
                result.push(recordObj);
            });
            defer.resolve(result);
        });
    }
    return defer.promise;
}

Dataset.prototype.getGMmarkers = function(){

};

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
