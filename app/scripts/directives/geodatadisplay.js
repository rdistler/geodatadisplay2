angular.module('geodatadisplay2App').directive('geodatadisplay', function () {
  var linker = function (scope, element, attrs) {
  	console.log(element);
  	element.append('<div>test</div>');

  };
  var controller = function ($scope) {
  	console.log('directive working');
  };
// Pending };
  return {
    restrict: 'E',
    controller: controller,
    link: linker
}; });