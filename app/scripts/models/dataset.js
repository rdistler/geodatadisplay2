geodatadisplayModule.factory('datasetModel', ['$http', '$q',
    function($http, $q) {


        function datasetModel($http) {
            this.data; //used to store raw json 

        }

        datasetModel.prototype.getData = function() {
            var defer = $q.defer();

            var _this = this;

            $http.jsonp(this.src + '?$jsonp=JSON_CALLBACK').
            success(function(data, status, headers, config) {
                _this.data = data;
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log('There was an error with the request');
            });
            return defer.promise;
        }

        datasetModel.prototype.getGeoJSON = function() {
            var defer = $q.defer();

            this.getData().then(function(data) {
                var json = {};

                json.bbox = [];
                json.crs = {};
                json.features = [];
                json.type = 'FeatureCollection';
                this.json = json;

                var columns = [];
                for (var i = 0; i < data.meta.view.columns.length; i++) {
                    var column = data.meta.view.columns[i];
                    if (column.id != -1) {
                        column.positionInArray = i;
                        columns[column.fieldName] = column;

                        // Check to see if this is a location column
                        if (this.locationFieldName != undefined && column.fieldName == this.locationFieldName) {
                            var locationColumn = column;
                        } else if (this.locationFieldName == undefined && column.dataTypeName == "location") {
                            var locationColumn = column;
                        }
                    }
                }

                this.columns = columns;

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
                        console.log(data.data[x][locationColumn.positionInArray][2]);
                        console.log(parseFloat(data.data[x][locationColumn.positionInArray][2]));
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

        

        return datasetModel;

    }
]);