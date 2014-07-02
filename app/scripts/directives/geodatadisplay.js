'use strict';
geodatadisplayModule.directive('geodatadisplay', function() {
    var linker = function(scope, element, attrs) {
        console.log('Executing Linker function in geodatadisplay directive');

        //console.log('datasetRepository length = ' + controllers.datasetRepository.length);

    };
    return {
        restrict: 'E',
        link: linker,
        controller: 'GeoDataDisplayCtrl'
    };
});