geodatadisplay.directive('geodatadisplay', function() {
    var linker = function(scope, element, attrs) {
        console.log('Executing Linker function in geodatadisplay directive');

        //console.log('dataSetRepository length = ' + controllers.dataSetRepository.length);

    };
    return {
        restrict: 'E',
        link: linker,
        controller: 'GeoDataDisplayCtrl'
    };
});