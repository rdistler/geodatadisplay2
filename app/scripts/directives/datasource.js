geodatadisplay.directive('dataset', function ($resource, dataSetModel) {
  var linker = function (scope, element, attrs) {
  	console.log('Executing Linker function for dataset directive');
    console.dir(attrs);
    console.log('Scope id for dataset directive is ' + scope.$id);
    console.dir(scope);

    var dataset = new dataSetModel();
    
    dataset.src = attrs.src;
    dataset.name = attrs.name;
    
    scope.datasets.push(dataset);

  };
  return {
    restrict: 'E',
    link: linker,
    require: ['^geodatadisplay']
}; });