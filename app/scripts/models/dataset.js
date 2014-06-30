geodatadisplay.factory('dataSetModel',['$http', function($http) {


	function dataSetModel($http){

	}

	dataSetModel.prototype.loadDataSet = function(){
		console.log('Checking if ' + this.name + ' dataset is loaded, if not get it.')
		var _this = this;
        if(this.data){
            console.log('Already have the data');
        }
        else {
		$http.jsonp(this.src + '?$jsonp=JSON_CALLBACK').
    		success(function(data, status, headers, config) {
                console.dir(data);
                _this.data = data;
                for (var x=0; x<data.length; x++) {
                    console.log(data[x].licensee);
                }
    		}).
    		error(function(data, status, headers, config) {
        		console.log('There was an error with the request');
    		});
        }

	};

	return dataSetModel;


}]);