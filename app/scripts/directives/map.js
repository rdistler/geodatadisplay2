geodatadisplay.directive('map', function () {
  var linker = function (scope, element, attrs) {
  	console.log('Executing Linker function for map directive');

  };
  return {
    restrict: 'E',
    link: linker
}; });