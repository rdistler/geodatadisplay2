geodatadisplay.directive('map', function() {
	var linker = function(scope, element, attrs) {
		console.log('map directive linker function');
		var myOptions = {
			zoom : 12,
			center : new google.maps.LatLng(38.5711659,-92.1624049),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(element.context, myOptions);

	};
	var controller = function($scope) {
		console.log('map directive controller function');
	};
	// Pending };
	return {
		restrict : 'A',
		controller : controller,
		link : linker
	};
}); 