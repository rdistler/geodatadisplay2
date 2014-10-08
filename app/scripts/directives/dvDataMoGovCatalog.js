'use strict';
geodatadisplayModule.directive('dvDatMoGovCatalog', function() {
    var linker = function(scope, element, attrs) {
        console.log('Executing Linker function in geodatadisplay directive');

    };
    return {
        restrict: 'E',
        link: linker,
        controller: 'GeoDataDisplayCtrl'
    };
});