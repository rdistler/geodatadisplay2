'use strict';
geodatadisplayModule.directive('dataset', function ($resource, datasetModel) {
  var linker = function (scope, element, attrs) {
  	console.log('Executing Linker function for dataset directive');
    console.dir(attrs);
    console.log('Scope id for dataset directive is ' + scope.$id);
    console.dir(scope);

    var dataset = new datasetModel();
    
    dataset.src = attrs.src;
    dataset.name = attrs.name;
    
    scope.geodatadisplayModel.datasetRepository.datasets.push(dataset);

  };
  return {
    restrict: 'E',
    link: linker,
    require: ['^geodatadisplay']
}; });