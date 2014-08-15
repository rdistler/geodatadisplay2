'use strict';
geodatadisplayModule.directive('dvContainer', function() {
    var linker = function(scope, element, attrs) {
        console.log('Executing Linker function in geodatadisplay directive');

        console.log('datasetRepository length = ' + scope.displayManager.datasetRepository.datasets.length);

    };
    return {
        restrict: 'E',
        link: linker,
        controller: 'GeoDataDisplayCtrl'
    };
});