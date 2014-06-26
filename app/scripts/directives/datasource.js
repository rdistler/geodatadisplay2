geodatadisplay.directive('dataset', function () {
  var linker = function (scope, element, attrs) {
  	console.log('Executing Linker function for dataset directive');

  };
  return {
    restrict: 'E',
    link: linker
}; });