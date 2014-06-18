geodatadisplay.directive('geodatadisplay', function() {
	var linker = function(scope, element, attrs) {
		console.log('Linker function in geodatadisplay directive');

	};
	return {
		restrict : 'A',
		link : linker,
		templateUrl : 'views/map.html'
	};
}); 