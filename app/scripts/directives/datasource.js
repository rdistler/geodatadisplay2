geodatadisplay.directive('datasource', function () {
  var linker = function (scope, element, attrs) {
  	//element.append('<script></script>');
  	console.log(scope);

  };
  var controller = function ($scope, $compile, $http) {
  	console.log('datasource directive working');
  	
  };
  console.log("executing compilter for datasource directive");
// Pending };
  return {
    restrict: 'E',
    scope: {
    	type: "=type"
    },
    controller: controller,
    link: linker,
    templateUrl: 'views/datasourceDirective.html'
}; });