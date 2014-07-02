/** This is the factory that builds the geodatadisplayModel. */

geodatadisplayModule.factory('geodatadisplayModel', ['geodatadisplaymap', 'datasetRepository',
    function(geodatadisplaymap, datasetRepository) {


        function geodatadisplayModel() {
            this.geodatadisplaymap = geodatadisplaymap;
            this.datasetRepository = datasetRepository;

        }

        geodatadisplayModel.prototype.displayDataset = function(dataset) {
            dataset.getGeoJSON().then(function(geoJSON) {
            	console.log(geoJSON);
            	geodatadisplaymap.add(geoJSON);
            });
        }




        return new geodatadisplayModel();


    }
]);