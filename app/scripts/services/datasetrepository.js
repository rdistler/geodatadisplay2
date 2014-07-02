geodatadisplayModule.service('datasetRepository', function() {

	this.datasets = [];
	this.displayDataset = function(dataset){
		console.log('Display dataset');
		console.log(dataset);
		if(!dataset.data){
			dataset.loadDataSet();
		}
	}

	// function datasetRepository(){

	// }

	// datasetRepository.prototype.getDataset = function(){

	// };

	// datasetRepository.datasets = [];

	// return datasetRepository;

});