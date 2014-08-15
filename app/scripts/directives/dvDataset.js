'use strict';
geodatadisplayModule.directive('dvDataset', ['$resource', '$q', '$http',
    function($resource, $q, $http) {
        var q = $q;
        var http = $http;
        var linker = function(scope, element, attrs) {
            console.log('Executing Linker function for dataset directive');
            console.dir(attrs);
            console.log('Scope id for dataset directive is ' + scope.$id);
            console.dir(scope);

            //var dataset = new datasetModel();
            var dataset = new Dataset();
            dataset.src = attrs.src;
            dataset.name = attrs.name;
            dataset.q = q;
            dataset.http = http;

            scope.displayManager.datasetRepository.addDataset(dataset);

        };
        return {
            restrict: 'E',
            link: linker,
            require: ['^dvContainer']
        };
    }
]);