geodatadisplayModule.factory('geodatadisplaymap',[function() {


	function geodatadisplaymap(){
        this.name = "geodatadisplaymap model";
        this.map;

	}

    geodatadisplaymap.prototype.displayLayers = function(){
        console.log('Display map layers');
    }

    geodatadisplaymap.prototype.add = function(geoJSON){
        this.map.data.addGeoJson(geoJSON);
    }




	return new geodatadisplaymap();


}]);